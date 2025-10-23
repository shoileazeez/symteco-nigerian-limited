import type { NextApiRequest, NextApiResponse } from 'next';

async function makeZohoAPICall(endpoint: string, accessToken: string) {
  const response = await fetch(`https://mail.zoho.com/api${endpoint}`, {
    headers: {
      'Authorization': `Zoho-oauthtoken ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();
  return { data, status: response.status };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Finding Zoho Mail accounts...');
    
    // Get all accounts for this user
    const accountsResponse = await makeZohoAPICall('/accounts', process.env.ZOHO_ACCESS_TOKEN!);
    
    console.log('Accounts response:', JSON.stringify(accountsResponse, null, 2));

    // Handle different possible response structures
    let accounts = [];
    
    if (accountsResponse.data?.data) {
      accounts = Array.isArray(accountsResponse.data.data) ? accountsResponse.data.data : [accountsResponse.data.data];
    } else if (accountsResponse.data && Array.isArray(accountsResponse.data)) {
      accounts = accountsResponse.data;
    } else if (accountsResponse.data) {
      accounts = [accountsResponse.data];
    }

    return res.status(200).json({
      success: true,
      message: 'Zoho Mail accounts response',
      accountsFound: accounts.length,
      accounts: accounts.map((account: any) => ({
        accountId: account.accountId,
        accountName: account.accountName,
        primaryEmailAddress: account.primaryEmailAddress,
        emailAddress: account.emailAddress,
        isDefault: account.isDefault
      })),
      recommendation: accounts.length > 0 ? {
        accountId: accounts[0].accountId,
        emailAddress: accounts[0].primaryEmailAddress || accounts[0].emailAddress,
        message: `Update your .env file with: ZOHO_ACCOUNT_ID=${accounts[0].accountId}`
      } : null,
      raw: accountsResponse
    });

  } catch (error: any) {
    console.error('Error finding accounts:', error);
    
    return res.status(500).json({
      success: false,
      error: 'Failed to find accounts',
      details: error.message
    });
  }
}