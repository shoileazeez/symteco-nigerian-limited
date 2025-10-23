# Zoho Mail API Configuration Guide

## Overview
This setup uses Zoho Mail API to fetch real emails from your Zoho inbox and handle replies through the Zoho email system. This provides true email threading and professional email management.

## Benefits
- ✅ Real email integration with your existing Zoho Mail account
- ✅ Proper email threading and conversation history
- ✅ Professional replies that appear in the original email thread
- ✅ No database needed for messages (emails stored in Zoho)
- ✅ Works with any email client (Gmail, Outlook, mobile apps)
- ✅ Automatic email categorization (quotes vs contacts)

## Required Environment Variables

Add these to your `.env` file:

```bash
# Zoho OAuth Credentials
ZOHO_CLIENT_ID=your_zoho_client_id_here
ZOHO_CLIENT_SECRET=your_zoho_client_secret_here
ZOHO_REFRESH_TOKEN=your_zoho_refresh_token_here
ZOHO_ACCESS_TOKEN=your_zoho_access_token_here

# Zoho Mail Account Details
ZOHO_ACCOUNT_ID=your_zoho_account_id_here
ZOHO_FROM_EMAIL=your_zoho_email@yourdomain.com
```

## Setup Steps

### 1. Create Zoho API Application
1. Go to [Zoho API Console](https://api-console.zoho.com/)
2. Click "Add Client" → Choose "Server-based Applications"
3. Fill in your application details:
   - Client Name: "Symteco Admin Dashboard"
   - Homepage URL: your website URL
   - Authorized Redirect URIs: `http://localhost:3000/auth/zoho/callback` (for development)

### 2. Configure API Scopes
Add these scopes to your application:
- `ZohoMail.messages.ALL` - Read and send emails
- `ZohoMail.folders.READ` - Access inbox, sent, etc.
- `ZohoMail.accounts.READ` - Get account information

### 3. Get Authorization Code
Visit this URL (replace YOUR_CLIENT_ID and YOUR_REDIRECT_URI):
```
https://accounts.zoho.com/oauth/v2/auth?scope=ZohoMail.messages.ALL,ZohoMail.folders.READ,ZohoMail.accounts.READ&client_id=YOUR_CLIENT_ID&response_type=code&access_type=offline&redirect_uri=YOUR_REDIRECT_URI
```

### 4. Exchange Code for Tokens
Use the authorization code to get access and refresh tokens:
```bash
curl -X POST https://accounts.zoho.com/oauth/v2/token \
  -d "grant_type=authorization_code" \
  -d "client_id=YOUR_CLIENT_ID" \
  -d "client_secret=YOUR_CLIENT_SECRET" \
  -d "redirect_uri=YOUR_REDIRECT_URI" \
  -d "code=AUTHORIZATION_CODE"
```

### 5. Get Your Account ID
```bash
curl -X GET "https://mail.zoho.com/api/accounts" \
  -H "Authorization: Zoho-oauthtoken YOUR_ACCESS_TOKEN"
```

## Testing the Integration

Once configured, test the API:
```bash
curl http://localhost:3000/lib/zoho-mail
```

## How It Works

### Contact Form Flow
1. Customer fills out contact form on website
2. Mailjet sends email to your Zoho inbox
3. Admin dashboard fetches emails from Zoho inbox
4. Emails are automatically categorized as quotes or contacts
5. Admin can reply directly through the dashboard
6. Replies are sent via Zoho Mail API (proper email threading)

### Email Threading
- Each email conversation maintains proper threading
- Replies include correct headers (In-Reply-To, References)
- Email clients show conversations properly grouped
- No database storage needed - everything in Zoho

### Real-time Updates
- Dashboard shows actual emails from your inbox
- Read/unread status synced with Zoho
- New emails appear automatically
- Works with any email client simultaneously

## Troubleshooting

### Common Issues
1. **401 Unauthorized**: Check access token, may need refresh
2. **403 Forbidden**: Verify API scopes are correct
3. **404 Not Found**: Check account ID and email addresses
4. **Rate Limits**: Zoho has API rate limits, implement delays if needed

### Token Refresh
Access tokens expire, but refresh tokens are long-lived. The system automatically refreshes tokens when needed.