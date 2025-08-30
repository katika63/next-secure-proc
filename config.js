// config.js
export const CONFIG = {
    API_KEY: process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'AIzaSyAYgmZMMGbeNvy6ezh0OYRtVYo_XnZ6RnA',
    API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2-0-flash-exp:streamGenerateContent',
    
    SYSTEM_INSTRUCTION: {
      parts: [{
        text: "You are BTMSecurity AI. Respond with:\n" +
          "1. Clear security-focused answers\n" +
          "2. Sequential steps when applicable\n" +
          "3. Code examples in secure formats\n" +
          "4. Risk analysis and mitigation\n\n" +
          "Structure:\n" +
          "🔍 [Analysis]\n" +
          "📌 [Key Points]\n" +
          "🛡️ [Protection]\n" +
          "💻 [Code Examples]\n" +
          "⚠️ [Warnings]"
      }]
    },
    
    GENERATION_CONFIG: {
      temperature: 0.2,
      topP: 0.7,
      topK: 15,
      maxOutputTokens: 2048
    },
    
    SAFETY_SETTINGS: [
      { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }
    ],
    
    NAVIGATION_LINKS: [
      { name: "Home", href: "/", icon: "fas fa-home", target: "_self" },
      { name: "OSINT", href: "https://osintframework.com", icon: "fas fa-search", target: "_blank" },
      { name: "Threat Analysis", href: "https://www.crowdstrike.com/cybersecurity-101/threat-intelligence/", icon: "fas fa-shield-virus", target: "_blank" },
      { name: "OWASP Top 10", href: "https://owasp.org/www-project-top-ten/", icon: "fas fa-bug", target: "_blank" },
      { name: "Malware Analysis", href: "https://labs.inquest.net", icon: "fas fa-bug", target: "_blank" },
      { name: "Metadata", href: "https://exiftool.org", icon: "fas fa-bug", target: "_blank" }
    ]
  };