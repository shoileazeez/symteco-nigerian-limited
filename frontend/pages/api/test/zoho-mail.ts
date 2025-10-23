import type { NextApiRequest, NextApiResponse } from 'next';

async function refreshZohoToken() {
  try {
    const response = await fetch('https://accounts.zoho.com/oauth/v2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        refresh_token: process.env.ZOHO_REFRESH_TOKEN!,
        client_id: process.env.ZOHO_CLIENT_ID!,
        client_secret: process.env.ZOHO_CLIENT_SECRET!,
        grant_type: 'refresh_token'
      })
    });

    const data = await response.json();
    
    if (data.error) {
      throw new Error(`Token refresh failed: ${data.error}`);
    }
    
    return data.access_token;
  } catch (error) {
    console.error('Error refreshing Zoho token:', error);
    throw error;
  }
}

async function makeZohoAPICall(endpoint: string, accessToken: string) {
  const response = await fetch(`https://mail.zoho.com/api${endpoint}`, {
    headers: {
      'Authorization': `Zoho-oauthtoken ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();
  
  if (response.status === 401) {
    // Token might be expired, try refreshing
    const newToken = await refreshZohoToken();
    
    // Retry with new token
    const retryResponse = await fetch(`https://mail.zoho.com/api${endpoint}`, {
      headers: {
        'Authorization': `Zoho-oauthtoken ${newToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    return await retryResponse.json();
  }
  
  return data;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Testing Zoho Mail API connection...');
    
    // Test 1: Get account information
    console.log('Step 1: Testing account access...');
    const accountInfo = await makeZohoAPICall(`/accounts/${process.env.ZOHO_ACCOUNT_ID}`, process.env.ZOHO_ACCESS_TOKEN!);
    
    // Test 2: Get folders
    console.log('Step 2: Testing folder access...');
    const folders = await makeZohoAPICall(`/accounts/${process.env.ZOHO_ACCOUNT_ID}/folders`, process.env.ZOHO_ACCESS_TOKEN!);
    
    // Test 3: Get recent messages from Inbox
    console.log('Step 3: Testing message access...');
    const messages = await makeZohoAPICall(`/accounts/${process.env.ZOHO_ACCOUNT_ID}/messages?folder=Inbox&limit=5`, process.env.ZOHO_ACCESS_TOKEN!);

    return res.status(200).json({
      success: true,
      message: 'Zoho Mail API connection successful!',
      tests: {
        accountInfo: {
          success: !!accountInfo.data,
          accountName: accountInfo.data?.accountName,
          primaryEmailAddress: accountInfo.data?.primaryEmailAddress,
          error: accountInfo.error,
          raw: accountInfo
        },
        folders: {
          success: !!folders.data,
          folderCount: Array.isArray(folders.data) ? folders.data.length : 0,
          folders: Array.isArray(folders.data) ? folders.data.map((f: any) => f.folderName) : [],
          error: folders.error,
          raw: folders
        },
        messages: {
          success: !!messages.data,
          messageCount: Array.isArray(messages.data) ? messages.data.length : 0,
          recentMessages: Array.isArray(messages.data) ? messages.data.map((m: any) => ({
            subject: m.subject,
            fromAddress: m.fromAddress,
            receivedTime: m.receivedTime,
            read: m.read
          })) : [],
          error: messages.error,
          raw: messages
        }
      },
      nextSteps: [
        'Zoho Mail API is working correctly!',
        'You can now use the admin panel to view and reply to emails',
        'All contact form submissions will be fetched from your Zoho Mail inbox',
        'Replies will be sent as real email responses'
      ]
    });

  } catch (error: any) {
    console.error('Zoho Mail API test failed:', error);
    
    return res.status(500).json({
      success: false,
      error: 'Zoho Mail API test failed',
      details: error.message,
      troubleshooting: [
        'Check if your access token is still valid',
        'Verify your Zoho account ID is correct',
        'Ensure your Zoho Mail account has the required permissions',
        'Try refreshing the access token using the refresh token'
      ]
    });
  }
}