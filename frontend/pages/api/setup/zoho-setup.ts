import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const authUrl = 'https://accounts.zoho.com/oauth/v2/auth?response_type=code&client_id=1000.E4L3QFV368NCRQZKM1OWB1WEYLT8AW&scope=ZohoMail.messages.ALL%2CZohoMail.accounts.READ%2CZohoMail.folders.READ&redirect_uri=https%3A%2F%2Fcurly-train-5g4gx44x7wjg2pxvj-3000.app.github.dev%2Fapi%2Fsetup%2Fzoho-callback&access_type=offline';

  const html = `
  <!DOCTYPE html>
  <html>
  <head>
      <title>Zoho Mail OAuth Setup</title>
      <style>
          body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; }
          .step { background: #f8f9fa; border: 1px solid #dee2e6; padding: 20px; border-radius: 4px; margin: 20px 0; }
          .success { background: #d4edda; border: 1px solid #c3e6cb; color: #155724; }
          .warning { background: #fff3cd; border: 1px solid #ffeaa7; color: #856404; }
          .code-input { width: 100%; padding: 10px; font-family: monospace; border: 1px solid #ccc; border-radius: 4px; }
          .btn { background: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; text-decoration: none; display: inline-block; }
          .btn:hover { background: #0056b3; }
          .btn-success { background: #28a745; }
          .btn-success:hover { background: #1e7e34; }
          #result { margin-top: 20px; }
      </style>
  </head>
  <body>
      <h1>🔧 Zoho Mail OAuth Setup</h1>
      
      <div class="step">
          <h2>Step 1: Authorize Application</h2>
          <p>Click the button below to authorize Zoho Mail access:</p>
          <a href="${authUrl}" target="_blank" class="btn">🚀 Authorize Zoho Mail</a>
          <p><small>This will open Zoho's authorization page in a new tab.</small></p>
      </div>

      <div class="step warning">
          <h2>Step 2: Copy Authorization Code</h2>
          <p>After authorization, you'll be redirected to a page that may show an error. <strong>Don't worry!</strong></p>
          <p>Look at the URL in your browser address bar. It will look like:</p>
          <code>https://curly-train-5g4gx44x7wjg2pxvj-3000.app.github.dev/api/setup/zoho-callback?code=1000.xxxxx&location=us&accounts-server=...</code>
          <p><strong>Copy the entire 'code' parameter value</strong> (the part after <code>code=</code> and before <code>&</code>)</p>
      </div>

      <div class="step">
          <h2>Step 3: Exchange Code for Tokens</h2>
          <p>Paste the authorization code here:</p>
          <input type="text" id="authCode" placeholder="1000.xxxxxxxxxxxxx" class="code-input">
          <br><br>
          <button onclick="exchangeCode()" class="btn btn-success">🔄 Get Tokens</button>
          
          <div id="result"></div>
      </div>

      <script>
          async function exchangeCode() {
              const code = document.getElementById('authCode').value.trim();
              const resultDiv = document.getElementById('result');
              
              if (!code) {
                  resultDiv.innerHTML = '<div class="warning" style="color: red;">Please enter the authorization code first.</div>';
                  return;
              }
              
              resultDiv.innerHTML = '<div>🔄 Exchanging code for tokens...</div>';
              
              try {
                  const response = await fetch('/api/setup/exchange-token', {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({ code })
                  });
                  
                  const data = await response.json();
                  
                  if (data.success) {
                      resultDiv.innerHTML = \`
                          <div class="success">
                              <h3>✅ Success! Tokens Retrieved</h3>
                              <p>Add these to your .env file:</p>
                              <pre style="background: #f8f9fa; padding: 15px; border-radius: 4px; overflow-x: auto;">
ZOHO_ACCESS_TOKEN=\${data.tokens.access_token}
ZOHO_REFRESH_TOKEN=\${data.tokens.refresh_token}</pre>
                              <p><strong>Next:</strong> Restart your development server and test the Zoho Mail integration!</p>
                          </div>
                      \`;
                  } else {
                      resultDiv.innerHTML = \`
                          <div class="warning" style="color: red;">
                              <h3>❌ Error</h3>
                              <p><strong>Error:</strong> \${data.error}</p>
                              <p><strong>Description:</strong> \${data.description || 'No description provided'}</p>
                              <p>Try getting a fresh authorization code by clicking Step 1 again.</p>
                          </div>
                      \`;
                  }
              } catch (error) {
                  resultDiv.innerHTML = \`
                      <div class="warning" style="color: red;">
                          <h3>❌ Request Failed</h3>
                          <p>Error: \${error.message}</p>
                      </div>
                  \`;
              }
          }
          
          // Auto-focus the input field
          document.getElementById('authCode').focus();
          
          // Allow Enter key to submit
          document.getElementById('authCode').addEventListener('keypress', function(e) {
              if (e.key === 'Enter') {
                  exchangeCode();
              }
          });
      </script>
  </body>
  </html>`;

  res.setHeader('Content-Type', 'text/html');
  return res.status(200).send(html);
}