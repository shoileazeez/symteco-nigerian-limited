import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyRefreshToken, generateTokens, JWTPayload } from '../../../lib/jwt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    // Get refresh token from cookie
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ 
        success: false, 
        error: 'No refresh token provided' 
      });
    }

    // Verify refresh token
    const decoded = verifyRefreshToken(refreshToken);
    
    if (!decoded) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid refresh token' 
      });
    }

    // Generate new tokens
    const userPayload: JWTPayload = {
      id: decoded.id,
      email: decoded.email,
      name: decoded.name,
      role: decoded.role,
    };

    const tokens = generateTokens(userPayload);

    // Set new refresh token cookie
    res.setHeader('Set-Cookie', [
      `refreshToken=${tokens.refreshToken}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; SameSite=Lax${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`,
    ]);

    return res.status(200).json({
      success: true,
      accessToken: tokens.accessToken,
      user: tokens.user
    });

  } catch (error) {
    console.error('Token refresh error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
}