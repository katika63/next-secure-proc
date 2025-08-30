// app/api/chat/route.js
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-pro',
      systemInstruction: "You are BTMSecurity AI. Respond with:\n" +
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
    });

    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    // Format the response with security enhancements
    const formattedResponse = formatSecurityResponse(text);

    return NextResponse.json({ response: formattedResponse });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function formatSecurityResponse(raw) {
  // Enhanced formatting with security emojis
  let formatted = raw
    .replace(/```(\w+)?\n([\s\S]+?)\n```/g, (match, lang, code) => {
      // Sanitize code examples by escaping HTML
      const cleanCode = code
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
      
      return `<pre class="code-block ${lang || ''}">${cleanCode}</pre>`;
    })
    .replace(/(\d+\.\s)/g, '<br>$1')  // Better numbered lists
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');

  // Add security headers if missing
  if (!formatted.includes('🔍') && !formatted.includes('🛡️')) {
    formatted = `🔍 [BTMSecurity Analysis]<br><br>${formatted}`;
  }

  return formatted;
}