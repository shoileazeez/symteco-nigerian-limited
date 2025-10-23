import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret-key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key';

export interface JWTPayload {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  user: JWTPayload;
}

// Generate access token (30 minutes)
export function generateAccessToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '30m' });
}

// Generate refresh token (7 days)
export function generateRefreshToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '7d' });
}

// Generate both tokens
export function generateTokens(user: JWTPayload): TokenResponse {
  return {
    accessToken: generateAccessToken(user),
    refreshToken: generateRefreshToken(user),
    user
  };
}

// Verify access token
export function verifyAccessToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
}

// Verify refresh token
export function verifyRefreshToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
}

// Extract token from Authorization header
export function extractTokenFromHeader(req: NextApiRequest): string | null {
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return null;
  }
  return authorization.substring(7);
}

// Middleware to verify JWT token
export function verifyToken(req: NextApiRequest, res: NextApiResponse): JWTPayload | null {
  const token = extractTokenFromHeader(req);
  
  if (!token) {
    return null;
  }

  const decoded = verifyAccessToken(token);
  if (!decoded) {
    return null;
  }

  return decoded;
}

// Authentication middleware
export function requireAuth(handler: (req: NextApiRequest, res: NextApiResponse, user: JWTPayload) => Promise<void>) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const user = verifyToken(req, res);
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        error: 'Unauthorized - Invalid or missing token' 
      });
    }

    // Add user to request for use in handler
    (req as any).user = user;
    
    return handler(req, res, user);
  };
}