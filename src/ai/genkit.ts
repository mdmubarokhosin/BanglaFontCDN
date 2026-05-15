import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

// Note: Do NOT import dotenv/config here.
// On Cloudflare Pages (edge runtime), 'fs' is not available.
// Set GEMINI_API_KEY or GOOGLE_GENAI_API_KEY in Cloudflare Pages dashboard.

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_GENAI_API_KEY,
    }),
  ],
  model: 'googleai/gemini-2.5-flash',
});
