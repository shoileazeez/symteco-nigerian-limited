import type { NextApiRequest, NextApiResponse } from 'next';

// Zoho Mail API configuration
const ZOHO_CONFIG = {
  baseUrl: 'https://mail.zoho.com/api/accounts',
  accountId: process.env.ZOHO_ACCOUNT_ID, // Your Zoho account ID
  accessToken: process.env.ZOHO_ACCESS_TOKEN, // OAuth access token
  refreshToken: process.env.ZOHO_REFRESH_TOKEN, // OAuth refresh token
  clientId: process.env.ZOHO_CLIENT_ID,
  clientSecret: process.env.ZOHO_CLIENT_SECRET,
};

// Helper function to refresh Zoho access token
async function refreshZohoToken() {
  try {
    const response = await fetch('https://accounts.zoho.com/oauth/v2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        refresh_token: ZOHO_CONFIG.refreshToken!,
        client_id: ZOHO_CONFIG.clientId!,
        client_secret: ZOHO_CONFIG.clientSecret!,
        grant_type: 'refresh_token',
      }),
    });

    const data = await response.json();
    
    if (data.access_token) {
      // In production, you'd want to store this new token securely
      process.env.ZOHO_ACCESS_TOKEN = data.access_token;
      return data.access_token;
    }
    
    throw new Error('Failed to refresh token');
  } catch (error) {
    console.error('Error refreshing Zoho token:', error);
    throw error;
  }
}

// Helper function to make Zoho API requests
async function zohoApiRequest(endpoint: string, options: RequestInit = {}) {
  let accessToken = ZOHO_CONFIG.accessToken;
  
  const makeRequest = async (token: string) => {
    return fetch(`${ZOHO_CONFIG.baseUrl}/${ZOHO_CONFIG.accountId}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Zoho-oauthtoken ${token}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
  };

  let response = await makeRequest(accessToken!);
  
  // If unauthorized, try refreshing the token
  if (response.status === 401) {
    console.log('Access token expired, refreshing...');
    accessToken = await refreshZohoToken();
    response = await makeRequest(accessToken);
  }
  
  if (!response.ok) {
    throw new Error(`Zoho API error: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
}

// Get folders (Inbox, Sent, etc.)
export async function getZohoFolders() {
  return zohoApiRequest('/folders');
}

// Get messages from a folder
export async function getZohoMessages(folderId: string = '1', params: any = {}) {
  const queryParams = new URLSearchParams({
    limit: '50',
    start: '0',
    sortBy: 'receivedTime',
    sortOrder: 'desc',
    ...params,
  });
  
  return zohoApiRequest(`/folders/${folderId}/messages?${queryParams}`);
}

// Get a specific message with full details
export async function getZohoMessage(messageId: string) {
  return zohoApiRequest(`/messages/${messageId}`);
}

// Get message conversation thread
export async function getZohoConversation(conversationId: string) {
  return zohoApiRequest(`/conversations/${conversationId}/messages`);
}

// Send a reply
export async function sendZohoReply(messageId: string, replyData: {
  toAddress: string;
  subject: string;
  content: string;
  ccAddress?: string;
  bccAddress?: string;
}) {
  return zohoApiRequest(`/messages/${messageId}/reply`, {
    method: 'POST',
    body: JSON.stringify({
      toAddress: replyData.toAddress,
      subject: replyData.subject,
      content: replyData.content,
      ccAddress: replyData.ccAddress || '',
      bccAddress: replyData.bccAddress || '',
    }),
  });
}

// Send a new email
export async function sendZohoEmail(emailData: {
  toAddress: string;
  subject: string;
  content: string;
  ccAddress?: string;
  bccAddress?: string;
  fromAddress?: string;
}) {
  return zohoApiRequest('/messages', {
    method: 'POST',
    body: JSON.stringify({
      fromAddress: emailData.fromAddress || process.env.ZOHO_FROM_EMAIL,
      toAddress: emailData.toAddress,
      subject: emailData.subject,
      content: emailData.content,
      ccAddress: emailData.ccAddress || '',
      bccAddress: emailData.bccAddress || '',
    }),
  });
}

// Mark message as read/unread
export async function markZohoMessage(messageId: string, action: 'read' | 'unread') {
  return zohoApiRequest(`/messages/${messageId}/actions/${action}`, {
    method: 'PUT',
  });
}

// Search messages
export async function searchZohoMessages(query: string, params: any = {}) {
  const queryParams = new URLSearchParams({
    searchKey: query,
    limit: '50',
    start: '0',
    ...params,
  });
  
  return zohoApiRequest(`/search?${queryParams}`);
}

// Get message statistics
export async function getZohoStats() {
  const folders = await getZohoFolders();
  const inbox = folders.data.find((folder: any) => folder.folderName === 'Inbox');
  
  if (!inbox) {
    throw new Error('Inbox folder not found');
  }
  
  const messages = await getZohoMessages(inbox.folderId, { limit: '1000' });
  
  // Categorize messages
  const stats = {
    total: messages.data.length,
    unread: 0,
    quotes: 0,
    contacts: 0,
    recent: 0, // Last 24 hours
  };
  
  const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);
  
  messages.data.forEach((message: any) => {
    if (!message.isRead) stats.unread++;
    
    const subject = message.subject.toLowerCase();
    const content = (message.summary || '').toLowerCase();
    
    if (subject.includes('quote') || content.includes('quote') || 
        subject.includes('pricing') || content.includes('estimate')) {
      stats.quotes++;
    } else {
      stats.contacts++;
    }
    
    if (message.receivedTime > oneDayAgo) {
      stats.recent++;
    }
  });
  
  return stats;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Test Zoho API connection
    const folders = await getZohoFolders();
    const inbox = folders.data.find((folder: any) => folder.folderName === 'Inbox');
    
    if (!inbox) {
      throw new Error('Inbox folder not found');
    }
    
    const messages = await getZohoMessages(inbox.folderId, { limit: '10' });
    
    return res.status(200).json({
      success: true,
      message: 'Zoho Mail API connection successful',
      data: {
        folders: folders.data.length,
        inboxMessages: messages.data.length,
        sampleMessages: messages.data.slice(0, 3).map((msg: any) => ({
          id: msg.messageId,
          subject: msg.subject,
          from: msg.fromAddress,
          receivedTime: new Date(msg.receivedTime).toISOString(),
          isRead: msg.isRead,
        }))
      }
    });
    
  } catch (error: any) {
    console.error('Zoho API test error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to connect to Zoho Mail API',
      details: error.message,
      suggestion: 'Please check your Zoho Mail API credentials in environment variables'
    });
  }
}