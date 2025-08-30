// Configuration file for API keys and settings
const CONFIG = {
    // Gemini AI Configuration
    GEMINI_API_KEY: 'AIzaSyAYgmZMMGbeNvy6ezh0OYRtVYo_XnZ6RnA',
    GEMINI_API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
    
    // Supabase Configuration - You'll need to replace these with your actual Supabase credentials
    // Go to https://supabase.com/dashboard to create a new project and get these values
    SUPABASE_URL: 'https://your-project-ref.supabase.co', // Replace with your Supabase project URL
    SUPABASE_ANON_KEY: 'your-anon-key-here', // Replace with your Supabase anon key
    
    // App Settings
    MAX_TOKENS: 2048,
    TEMPERATURE: 0.7,
    MAX_CHAT_HISTORY: 50
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}