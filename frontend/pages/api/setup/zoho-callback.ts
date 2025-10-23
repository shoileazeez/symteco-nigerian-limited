import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });
  }

  const { code, error } = req.query;

  if (error) {
    return res.status(400).json({
      success: false,
      error: error as string,
      message: 'Authorization was denied or failed'
    });
  }

  if (!code) {
    return res.status(400).json({
      success: false,
      error: 'Authorization code not provided'
    });
  }

  try {
    // Use the exact redirect URI that was configured in Zoho
    // Since we know this is running in Codespaces, hardcode the correct URI
    const redirectUri = 'https://curly-train-5g4gx44x7wjg2pxvj-3000.app.github.dev/api/setup/zoho-callback';
    
    console.log('Callback received:', {
      host: req.headers.host,
      headers: req.headers,
      code: code ? 'present' : 'missing',
      redirectUri
    });
    
    const tokenParams = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: process.env.ZOHO_CLIENT_ID!,
      client_secret: process.env.ZOHO_CLIENT_SECRET!,
      redirect_uri: redirectUri,
      code: code as string
    });

    console.log('Token request params:', {
      grant_type: 'authorization_code',
      client_id: process.env.ZOHO_CLIENT_ID,
      client_secret: process.env.ZOHO_CLIENT_SECRET ? 'present' : 'missing',
      redirect_uri: redirectUri,
      code_present: !!code,
      code_preview: code ? (code as string).substring(0, 30) + '...' : 'none',
      timestamp: new Date().toISOString()
    });

    console.log('Making token request to Zoho...');
    
    const tokenResponse = await fetch('https://accounts.zoho.com/oauth/v2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: tokenParams
    });

    const tokens = await tokenResponse.json();
    
    console.log('Zoho token response status:', tokenResponse.status);
    console.log('Zoho token response headers:', Object.fromEntries(tokenResponse.headers.entries()));

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
          tokenResponse: tokens
        }
      });
    }

    // Return HTML page with tokens
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Zoho Mail OAuth Success</title>
        <style>
            body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; }
            .success { background: #d4edda; border: 1px solid #c3e6cb; color: #155724; padding: 15px; border-radius: 4px; }
            .code-block { background: #f8f9fa; border: 1px solid #dee2e6; padding: 15px; border-radius: 4px; margin: 10px 0; font-family: monospace; white-space: pre-wrap; }
            .warning { background: #fff3cd; border: 1px solid #ffeaa7; color: #856404; padding: 15px; border-radius: 4px; margin: 15px 0; }
        </style>
    </head>
    <body>
        <h1>🎉 Zoho Mail OAuth Success!</h1>
        
        <div class="success">
            <strong>Success!</strong> Your Zoho Mail access tokens have been generated successfully.
        </div>

        <h2>📝 Add These to Your .env File:</h2>
        
        <div class="code-block">ZOHO_ACCESS_TOKEN=${tokens.access_token}
ZOHO_REFRESH_TOKEN=${tokens.refresh_token}</div>

        <div class="warning">
            <strong>⚠️ Important:</strong>
            <ul>
                <li>Copy the tokens above and add them to your <code>.env</code> file</li>
                <li>The access token expires in ${tokens.expires_in} seconds (~${Math.round(tokens.expires_in / 3600)} hours)</li>
                <li>The refresh token will be used to automatically get new access tokens</li>
                <li>Keep these tokens secure and never commit them to version control</li>
            </ul>
        </div>

        <h2>📧 Next Steps:</h2>
        <ol>
            <li>Add the tokens to your <code>.env</code> file</li>
            <li>Restart your development server</li>
            <li>Test the Zoho Mail integration</li>
            <li>Your admin panel will now fetch real emails from Zoho Mail</li>
        </ol>

        <h2>🔧 Token Details:</h2>
        <ul>
            <li><strong>Access Token:</strong> Used for API requests (expires in ${Math.round(tokens.expires_in / 3600)} hours)</li>
            <li><strong>Refresh Token:</strong> Used to get new access tokens automatically</li>
            <li><strong>Scope:</strong> ZohoMail.messages.ALL, ZohoMail.accounts.READ, ZohoMail.folders.READ</li>
        </ul>

        <script>
            // Auto-select the env variables for easy copying
            document.querySelector('.code-block').addEventListener('click', function() {
                const range = document.createRange();
                range.selectNode(this);
                window.getSelection().removeAllRanges();
                window.getSelection().addRange(range);
            });
        </script>
    </body>
    </html>`;

    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(html);

  } catch (error) {
    console.error('Token exchange error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to exchange code for tokens',
      details: error.message
    });
  }
}