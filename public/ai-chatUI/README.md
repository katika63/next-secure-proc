# BtmSecurity AI Chat UI

A modern, responsive AI chat interface built with vanilla JavaScript, integrated with Google's Gemini AI and Supabase for data persistence and user management.

## Features

- 🤖 **AI-Powered Chat**: Integration with Google's Gemini AI for intelligent responses
- 💾 **Data Persistence**: Chat history stored in Supabase database
- 👤 **User Authentication**: Sign up/sign in functionality with Supabase Auth
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 📁 **File Upload Support**: Upload images, documents, and files for AI analysis
- ⚡ **Message Actions**: Edit, copy, delete, regenerate, and continue messages
- 🎨 **Modern UI**: Clean, professional interface with smooth animations
- 📚 **Chat History**: Persistent chat history with search and organization

## Quick Setup Guide

### 1. Gemini AI Setup (✅ Already Configured)
Your Gemini API key is already configured in `config.js`. The integration is ready to use!

### 2. Supabase Setup (Required)

#### Step 2.1: Create Supabase Project
1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Choose your organization and fill in project details
4. Wait for the project to be created (2-3 minutes)

#### Step 2.2: Get Your Supabase Credentials
1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy your **Project URL** and **anon public key**
3. Update `config.js` with your credentials:

```javascript
SUPABASE_URL: 'https://your-project-ref.supabase.co',
SUPABASE_ANON_KEY: 'your-anon-key-here',
```

#### Step 2.3: Set Up Database Tables
1. In your Supabase dashboard, go to **SQL Editor**
2. Copy the contents of `supabase-setup.sql`
3. Paste and run the SQL commands
4. This will create the necessary tables and security policies

### 3. Test Your Setup

1. Open `index.html` in your web browser
2. Try sending a message to test Gemini AI integration
3. The chat should work even without Supabase (uses localStorage as fallback)
4. Once Supabase is configured, chats will be saved to the database

## File Structure

```
ai-chatUI/
├── index.html              # Main HTML file
├── styles.css              # Styling and responsive design
├── script.js               # Main application logic
├── config.js               # API keys and configuration
├── gemini-service.js       # Gemini AI integration
├── supabase-service.js     # Supabase database operations
├── supabase-setup.sql      # Database schema and setup
└── README.md               # This file
```

## Configuration Options

Edit `config.js` to customize:

- **GEMINI_API_KEY**: Your Google Gemini API key (already set)
- **SUPABASE_URL**: Your Supabase project URL
- **SUPABASE_ANON_KEY**: Your Supabase anonymous key
- **MAX_TOKENS**: Maximum response length (default: 1000)
- **TEMPERATURE**: AI creativity level (default: 0.7)
- **MAX_CHAT_HISTORY**: Maximum stored chats (default: 50)

## Deployment to Vercel

### Prerequisites
- Vercel account
- GitHub repository (recommended)

### Steps
1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Deploy with default settings
4. Your app will be live at `https://your-app-name.vercel.app`

### Environment Variables for Production
For production deployment, consider moving sensitive keys to environment variables:

1. In Vercel dashboard, go to your project settings
2. Add environment variables:
   - `VITE_GEMINI_API_KEY`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

## Features in Detail

### Chat Management
- **New Chat**: Start fresh conversations
- **Chat History**: Browse and resume previous chats
- **Auto-Save**: Conversations saved automatically
- **Search**: Find specific chats quickly

### Message Features
- **Rich Text**: Formatted responses from AI
- **Copy Messages**: One-click copy to clipboard
- **Edit Messages**: Modify your messages and get new responses
- **Regenerate**: Get alternative AI responses
- **Continue**: Extend AI responses

### File Upload
- **Images**: Upload and analyze images with AI
- **Documents**: Process PDF, DOC, TXT files
- **Any File**: General file upload support

### User Authentication
- **Sign Up**: Create new accounts
- **Sign In**: Secure login
- **Profile Management**: User profiles and preferences
- **Data Privacy**: Row-level security ensures data isolation

## Troubleshooting

### Common Issues

1. **AI not responding**
   - Check your Gemini API key in `config.js`
   - Verify internet connection
   - Check browser console for errors

2. **Chat history not saving**
   - Verify Supabase configuration
   - Check if database tables are created
   - App will fallback to localStorage if Supabase fails

3. **Authentication issues**
   - Confirm Supabase URL and keys are correct
   - Check if auth is enabled in Supabase dashboard
   - Verify email confirmation settings

### Browser Compatibility
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Support

For issues or questions:
1. Check the browser console for error messages
2. Verify all configuration steps are completed
3. Test with a simple message first

## License

This project is open source and available under the MIT License.