import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const html = `
  <!DOCTYPE html>
  <html>
  <head>
      <title>🔧 Zoho Mail Reconfiguration Guide</title>
      <style>
          body { font-family: Arial, sans-serif; max-width: 900px; margin: 30px auto; padding: 20px; line-height: 1.6; }
          .step { background: #f8f9fa; border-left: 4px solid #007bff; padding: 20px; margin: 20px 0; border-radius: 0 8px 8px 0; }
          .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 15px 0; border-radius: 0 8px 8px 0; }
          .success { background: #d4edda; border-left: 4px solid #28a745; padding: 15px; margin: 15px 0; border-radius: 0 8px 8px 0; }
          .code { background: #f1f3f4; padding: 12px; border-radius: 4px; font-family: monospace; margin: 10px 0; overflow-x: auto; }
          .btn { background: #007bff; color: white; padding: 12px 24px; border: none; border-radius: 4px; cursor: pointer; text-decoration: none; display: inline-block; margin: 5px; }
          .btn:hover { background: #0056b3; }
          .btn-success { background: #28a745; }
          .btn-success:hover { background: #1e7e34; }
          .btn-warning { background: #ffc107; color: #000; }
          .btn-warning:hover { background: #e0a800; }
          h1, h2 { color: #333; }
          .highlight { background: #ffeb3b; padding: 2px 6px; border-radius: 3px; }
          .scopes { background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 10px 0; }
      </style>
  </head>
  <body>
      <h1>🔧 Zoho Mail Reconfiguration Guide</h1>
      
      <div class="warning">
          <h2>🚨 Important: Complete Reconfiguration Required</h2>
          <p>We need to create a new Zoho application with the correct scopes and settings for Mail integration.</p>
      </div>

      <div class="step">
          <h2>📝 Step 1: Create New Zoho Application</h2>
          <ol>
              <li><strong>Visit:</strong> <a href="https://api-console.zoho.com/" target="_blank">https://api-console.zoho.com/</a></li>
              <li><strong>Sign in</strong> with your Zoho account: <code>ibrotech@symteconigerialimited.com</code></li>
              <li><strong>Click:</strong> "Add Client" or "Create New Application"</li>
              <li><strong>Select:</strong> "Server-based Applications"</li>
              <li><strong>Fill in the form:</strong></li>
          </ol>
          
          <div class="code">
<strong>Application Details:</strong>
Client Name: Symteco Mail Integration v2
Homepage URL: https://curly-train-5g4gx44x7wjg2pxvj-3000.app.github.dev
Description: Email integration for Symteco Nigerian Limited website

<strong>Authorized Redirect URIs:</strong>
https://curly-train-5g4gx44x7wjg2pxvj-3000.app.github.dev/api/setup/zoho-callback
http://localhost:3000/api/setup/zoho-callback
          </div>
          
          <div class="scopes">
              <h3>🔐 Required OAuth Scopes</h3>
              <p><strong>Make sure to request these scopes during setup:</strong></p>
              <ul>
                  <li><code>ZohoMail.messages.ALL</code> - Read and send emails</li>
                  <li><code>ZohoMail.accounts.READ</code> - Access account information</li>
                  <li><code>ZohoMail.folders.READ</code> - Access mail folders</li>
                  <li><code>ZohoMail.organization.accounts.READ</code> - Organization access (if needed)</li>
              </ul>
          </div>
      </div>

      <div class="step">
          <h2>🔑 Step 2: Update Environment Variables</h2>
          <p>After creating the application, copy the <strong>Client ID</strong> and <strong>Client Secret</strong>:</p>
          
          <div class="code">
<strong>Update your .env file with:</strong>
ZOHO_CLIENT_ID=your_new_client_id_here
ZOHO_CLIENT_SECRET=your_new_client_secret_here
ZOHO_ACCESS_TOKEN=pending
ZOHO_REFRESH_TOKEN=pending
          </div>
          
          <div class="warning">
              <strong>⚠️ Important:</strong> Save the Client ID and Secret before proceeding to the next step!
          </div>
      </div>

      <div class="step">
          <h2>🚀 Step 3: Get New OAuth Tokens</h2>
          <p>After updating your .env file with the new Client ID and Secret:</p>
          
          <ol>
              <li>Restart your development server</li>
              <li>Come back to this page and click the button below</li>
              <li>Complete the OAuth flow to get new tokens</li>
          </ol>
          
          <a href="/api/setup/zoho-setup" class="btn btn-success">🔄 Start OAuth Flow</a>
          
          <div class="code">
<strong>Manual Authorization URL (if needed):</strong>
<span id="manualUrl">Will be generated after you update your credentials</span>
          </div>
      </div>

      <div class="step">
          <h2>✅ Step 4: Verify Integration</h2>
          <p>After getting your new tokens:</p>
          
          <ol>
              <li>Test the Zoho Mail API connection</li>
              <li>Verify you can read emails from your inbox</li>
              <li>Test sending replies through the admin panel</li>
          </ol>
          
          <a href="/api/test/zoho-mail" class="btn btn-warning">🧪 Test Integration</a>
      </div>

      <div class="success">
          <h2>🎯 Expected Result</h2>
          <p>After completing these steps, you should have:</p>
          <ul>
              <li>✅ Working Zoho Mail API connection</li>
              <li>✅ Ability to read emails from your Symteco inbox</li>
              <li>✅ Contact form submissions appearing in admin panel</li>
              <li>✅ Reply functionality through Zoho Mail</li>
              <li>✅ Real email threading and conversation history</li>
          </ul>
      </div>

      <div class="warning">
          <h2>🔍 Troubleshooting Tips</h2>
          <ul>
              <li><strong>Invalid Client Error:</strong> Double-check your Client ID and Secret</li>
              <li><strong>Redirect URI Mismatch:</strong> Ensure the redirect URIs are exactly as shown above</li>
              <li><strong>Scope Issues:</strong> Make sure you request all the required scopes during application creation</li>
              <li><strong>Account Issues:</strong> Verify you're using the correct Zoho account that has access to the email domain</li>
          </ul>
      </div>

      <script>
          // Generate authorization URL if credentials are available
          function updateManualUrl() {
              const clientId = prompt("Enter your new Zoho Client ID (optional, for manual URL generation):");
              if (clientId) {
                  const authUrl = \`https://accounts.zoho.com/oauth/v2/auth?response_type=code&client_id=\${clientId}&scope=ZohoMail.messages.ALL,ZohoMail.accounts.READ,ZohoMail.folders.READ&redirect_uri=https://curly-train-5g4gx44x7wjg2pxvj-3000.app.github.dev/api/setup/zoho-callback&access_type=offline\`;
                  document.getElementById('manualUrl').innerHTML = \`<a href="\${authUrl}" target="_blank">\${authUrl}</a>\`;
              }
          }
          
          document.getElementById('manualUrl').addEventListener('click', updateManualUrl);
      </script>
  </body>
  </html>`;

  res.setHeader('Content-Type', 'text/html');
  return res.status(200).send(html);
}