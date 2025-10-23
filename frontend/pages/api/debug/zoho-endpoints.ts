import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Testing different Zoho Mail API endpoints...');
    
    const accessToken = process.env.ZOHO_ACCESS_TOKEN!;
    const tests = [];

    // Test different API endpoints and base URLs
    const endpoints = [
      { name: 'accounts', url: 'https://mail.zoho.com/api/accounts' },
      { name: 'accounts_v2', url: 'https://mail.zoho.com/api/v2/accounts' },
      { name: 'me', url: 'https://mail.zoho.com/api/me' },
      { name: 'user_info', url: 'https://mail.zoho.com/api/userinfo' },
      { name: 'folders_direct', url: 'https://mail.zoho.com/api/folders' },
      { name: 'messages_direct', url: 'https://mail.zoho.com/api/messages' }
    ];

    for (const endpoint of endpoints) {
      try {
        console.log(`Testing: ${endpoint.name} - ${endpoint.url}`);
        
        const response = await fetch(endpoint.url, {
          headers: {
            'Authorization': `Zoho-oauthtoken ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();
        
        tests.push({
          name: endpoint.name,
          url: endpoint.url,
          status: response.status,
          success: response.status === 200,
          data: data,
          error: response.status !== 200 ? data : null
        });
        
      } catch (error: any) {
        tests.push({
          name: endpoint.name,
          url: endpoint.url,
          status: 'error',
          success: false,
          error: error.message
        });
      }
    }

    // Also test user profile info
    try {
      console.log('Testing Zoho user profile...');
      const profileResponse = await fetch('https://accounts.zoho.com/oauth/user/info', {
        headers: {
          'Authorization': `Zoho-oauthtoken ${accessToken}`
        }
      });
      
      const profileData = await profileResponse.json();
      
      tests.push({
        name: 'user_profile',
        url: 'https://accounts.zoho.com/oauth/user/info',
        status: profileResponse.status,
        success: profileResponse.status === 200,
        data: profileData
      });
      
    } catch (error: any) {
      tests.push({
        name: 'user_profile',
        url: 'https://accounts.zoho.com/oauth/user/info',
        status: 'error',
        success: false,
        error: error.message
      });
    }

    return res.status(200).json({
      success: true,
      message: 'API endpoint tests completed',
      tests,
      summary: {
        successful: tests.filter(t => t.success).length,
        failed: tests.filter(t => !t.success).length,
        workingEndpoints: tests.filter(t => t.success).map(t => t.name)
      },
      environment: {
        hasAccessToken: !!process.env.ZOHO_ACCESS_TOKEN,
        hasRefreshToken: !!process.env.ZOHO_REFRESH_TOKEN,
        hasClientId: !!process.env.ZOHO_CLIENT_ID,
        hasClientSecret: !!process.env.ZOHO_CLIENT_SECRET,
        accountId: process.env.ZOHO_ACCOUNT_ID,
        fromEmail: process.env.ZOHO_FROM_EMAIL
      }
    });

  } catch (error: any) {
    console.error('Error testing endpoints:', error);
    
    return res.status(500).json({
      success: false,
      error: 'Failed to test endpoints',
      details: error.message
    });
  }
}