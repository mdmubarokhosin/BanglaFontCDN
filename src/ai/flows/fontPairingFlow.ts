'use server';
/**
 * @fileOverview A flow for suggesting English font pairings for Bengali fonts.
 *
 * - suggestFontPairing - A function that suggests an English font to pair with a given Bengali font.
 * - FontPairingInput - The input type for the suggestFontPairing function.
 * - FontPairingOutput - The return type for the suggestFontPairing function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const FontPairingInputSchema = z.object({
  bengaliFontName: z.string().describe('The name of the Bengali font.'),
  category: z.string().describe('The category of the Bengali font (e.g., Serif, Sans-serif, Unicode).'),
  designer: z.string().describe('The designer of the Bengali font.'),
});
export type FontPairingInput = z.infer<typeof FontPairingInputSchema>;

const FontPairingOutputSchema = z.object({
  englishFontName: z.string().describe('The name of the suggested English font from Google Fonts.'),
  reason: z.string().describe('A brief explanation for why this font is a good pairing.'),
  googleFontLink: z.string().describe('The full @import URL to get the suggested English font from Google Fonts.'),
});
export type FontPairingOutput = z.infer<typeof FontPairingOutputSchema>;


export async function suggestFontPairing(input: FontPairingInput): Promise<FontPairingOutput> {
  return fontPairingFlow(input);
}


const prompt = ai.definePrompt({
  name: 'fontPairingPrompt',
  input: { schema: FontPairingInputSchema },
  output: { schema: FontPairingOutputSchema },
  prompt: `You are an expert typographer and graphic designer. Your task is to suggest a suitable English font pairing from Google Fonts for a given Bengali font.

Consider the following characteristics of the Bengali font:
- Name: {{{bengaliFontName}}}
- Category: {{{category}}}
- Designer: {{{designer}}}

Based on these characteristics, such as stroke contrast, weight, and overall mood (e.g., formal, casual, decorative), recommend an English font from Google Fonts that complements it harmoniously.

Provide the name of the English font, a brief reason for your choice, and the Google Fonts @import URL for the regular 400 weight.
`,
});

const fontPairingFlow = ai.defineFlow(
  {
    name: 'fontPairingFlow',
    inputSchema: FontPairingInputSchema,
    outputSchema: FontPairingOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
