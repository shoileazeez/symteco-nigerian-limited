import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed. Use POST with code in body.'
    });
  }

  const { code } = req.body;

  if (!code) {
    return res.status(400).json({
      success: false,
      error: 'Authorization code is required',
      example: {
        code: '1000.xxxx'
      }
    });
  }

  try {
    // Use the exact redirect URI that was configured in Zoho
    const redirectUri = 'https://curly-train-5g4gx44x7wjg2pxvj-3000.app.github.dev/api/setup/zoho-callback';
    
    const tokenParams = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: process.env.ZOHO_CLIENT_ID!,
      client_secret: process.env.ZOHO_CLIENT_SECRET!,
      redirect_uri: redirectUri,
      code: code
    });

    console.log('Manual token exchange:', {
      client_id: process.env.ZOHO_CLIENT_ID,
      redirect_uri: redirectUri,
      code_preview: code.substring(0, 20) + '...'
    });

    const tokenResponse = await fetch('https://accounts.zoho.com/oauth/v2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: tokenParams
    });

    const tokens = await tokenResponse.json();

    console.log('Token response:', {
      success: !tokens.error,
      error: tokens.error,
      hasAccessToken: !!tokens.access_token,
      hasRefreshToken: !!tokens.refresh_token
    });

    if (tokens.error) {
      console.error('Token exchange failed:', tokens);
      return res.status(400).json({
        success: false,
        error: tokens.error,
        description: tokens.error_description,
        debug: {
          redirectUri,
          clientId: process.env.ZOHO_CLIENT_ID,
          codePreview: code.substring(0, 20) + '...'
        }
      });
    }

    // Return success response with tokens
    return res.status(200).json({
      success: true,
      message: 'Tokens obtained successfully!',
      tokens: {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        expires_in: tokens.expires_in,
        token_type: tokens.token_type
      },
      envVariables: [
        `ZOHO_ACCESS_TOKEN=${tokens.access_token}`,
        `ZOHO_REFRESH_TOKEN=${tokens.refresh_token}`
      ],
      instructions: [
        '1. Copy the tokens above and add them to your .env file',
        '2. Restart your development server',
        '3. Test the Zoho Mail integration',
        '4. Your admin panel will now fetch real emails from Zoho Mail'
      ]
    });

  } catch (error) {
    console.error('Token exchange error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to exchange code for tokens',
      details: error.message
    });
  }
}