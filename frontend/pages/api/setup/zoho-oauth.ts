import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { step } = req.query;

    if (step === 'authorize') {
      // Step 1: Generate authorization URL
      // For GitHub Codespaces, use the dynamic URL
      const baseUrl = req.headers.host?.includes('github.dev') 
        ? `https://${req.headers.host}`
        : (process.env.NEXTAUTH_URL || 'http://localhost:3000');
        
      const authParams = new URLSearchParams({
        response_type: 'code',
        client_id: process.env.ZOHO_CLIENT_ID!,
        scope: 'ZohoMail.messages.ALL,ZohoMail.accounts.READ,ZohoMail.folders.READ',
        redirect_uri: `${baseUrl}/api/setup/zoho-callback`,
        access_type: 'offline'
      });

      const authUrl = `https://accounts.zoho.com/oauth/v2/auth?${authParams}`;

      return res.status(200).json({
        success: true,
        message: 'Visit this URL to authorize Zoho Mail access',
        authUrl,
        redirectUri: `${baseUrl}/api/setup/zoho-callback`,
        instructions: [
          '1. Copy the redirect URI below and add it to your Zoho application settings',
          '2. Click the authorization URL',
          '3. Sign in with your Zoho account',
          '4. Grant the requested permissions',
          '5. You will be redirected back with tokens'
        ]
      });
    }

    if (step === 'callback') {
      // Step 2: Exchange code for tokens
      const { code } = req.query;

      if (!code) {
        return res.status(400).json({
          success: false,
          error: 'Authorization code not provided'
        });
      }

      try {
        const tokenParams = new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: process.env.ZOHO_CLIENT_ID!,
          client_secret: process.env.ZOHO_CLIENT_SECRET!,
          redirect_uri: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/setup/zoho-callback`,
          code: code as string
        });

        const tokenResponse = await fetch('https://accounts.zoho.com/oauth/v2/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: tokenParams
        });

        const tokens = await tokenResponse.json();

        if (tokens.error) {
          return res.status(400).json({
            success: false,
            error: tokens.error,
            description: tokens.error_description
          });
        }

        // Return tokens for you to add to .env
        return res.status(200).json({
          success: true,
          message: 'Tokens received successfully! Add these to your .env file:',
          tokens: {
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
            expires_in: tokens.expires_in
          },
          envVariables: [
            `ZOHO_ACCESS_TOKEN=${tokens.access_token}`,
            `ZOHO_REFRESH_TOKEN=${tokens.refresh_token}`
          ]
        });

      } catch (error) {
        console.error('Token exchange error:', error);
        return res.status(500).json({
          success: false,
          error: 'Failed to exchange code for tokens'
        });
      }
    }

    // Default: Show setup instructions
    return res.status(200).json({
      success: true,
      message: 'Zoho Mail OAuth Setup',
      steps: [
        'Visit /api/setup/zoho-oauth?step=authorize to get authorization URL',
        'Follow the authorization flow',
        'Get your access and refresh tokens',
        'Add them to your .env file'
      ],
      currentConfig: {
        clientId: process.env.ZOHO_CLIENT_ID ? 'Set ✓' : 'Missing ✗',
        clientSecret: process.env.ZOHO_CLIENT_SECRET ? 'Set ✓' : 'Missing ✗',
        fromEmail: process.env.ZOHO_FROM_EMAIL || 'Not set',
        accountId: process.env.ZOHO_ACCOUNT_ID || 'Not set'
      }
    });
  }

  return res.status(405).json({
    success: false,
    error: 'Method not allowed. Use GET to start OAuth flow.'
  });
}