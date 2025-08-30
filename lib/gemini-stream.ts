// lib/gemini-stream.ts
import { CONFIG } from './config';

export async function streamGeminiAPI(prompt: string, onChunk: (chunk: string) => void): Promise<void> {
  const API_URL = `${CONFIG.API_URL}?alt=sse&key=${CONFIG.API_KEY}`;

  const requestBody = {
    contents: [{
      parts: [{ text: prompt }]
    }],
    systemInstruction: CONFIG.SYSTEM_INSTRUCTION,
    generationConfig: CONFIG.GENERATION_CONFIG,
    safetySettings: CONFIG.SAFETY_SETTINGS
  };

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error ${response.status}: ${errorText}`);
  }

  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error('No reader available');
  }

  const decoder = new TextDecoder('utf-8');
  let accumulatedContent = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const jsonData = line.slice(6);
          if (jsonData === '[DONE]') continue;

          try {
            const parsedData = JSON.parse(jsonData);
            const part = parsedData.candidates?.[0]?.content?.parts?.[0]?.text;
            
            if (part) {
              accumulatedContent += part;
              onChunk(accumulatedContent);
            }
          } catch (e) {
            console.warn("Could not parse JSON:", e, jsonData);
          }
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}