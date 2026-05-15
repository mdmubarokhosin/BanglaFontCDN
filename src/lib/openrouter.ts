/**
 * OpenRouter API হেল্পার
 * Edge Runtime কম্প্যাটিবল — কোনো Node.js মডিউল ব্যবহার করে না।
 *
 * কনফিগারেশন সোর্স (অগ্রাধিকার ক্রম):
 *   ১. process.env.OPENROUTER_API_KEY (Cloudflare Pages Secret)
 *   ২. settings.json (অ্যাডমিন প্যানেল থেকে সেট)
 *   ৩. কোনো ফলব্যাক নেই (এরর দেবে)
 */

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

interface OpenRouterSettings {
  apiKey: string;
  model: string;
  siteUrl?: string;
  siteName?: string;
}

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface FontPairingInput {
  bengaliFontName: string;
  category: string;
  designer: string;
}

interface FontPairingOutput {
  englishFontName: string;
  reason: string;
  googleFontLink: string;
}

/**
 * OpenRouter কনফিগারেশন পান
 * env var > settings.json (অগ্রাধিকার ক্রম)
 */
async function getOpenRouterSettings(): Promise<OpenRouterSettings | null> {
  // সর্বোচ্চ অগ্রাধিকার: Environment Variables
  const envApiKey = process.env.OPENROUTER_API_KEY;
  const envModel = process.env.OPENROUTER_MODEL;
  const envSiteUrl = process.env.OPENROUTER_SITE_URL;
  const envSiteName = process.env.OPENROUTER_SITE_NAME;

  if (envApiKey) {
    return {
      apiKey: envApiKey,
      model: envModel || "google/gemini-2.5-flash-preview",
      siteUrl: envSiteUrl || undefined,
      siteName: envSiteName || undefined,
    };
  }

  // দ্বিতীয় অগ্রাধিকার: settings.json (অ্যাডমিন প্যানেল থেকে সেট)
  try {
    const { readFile } = await import("@/lib/github");
    const raw = await readFile("src/data/settings.json");
    if (!raw) return null;
    const settings = JSON.parse(raw);

    if (!settings.openrouterApiKey || !settings.openrouterModel) {
      return null;
    }

    return {
      apiKey: settings.openrouterApiKey,
      model: settings.openrouterModel,
      siteUrl: settings.openrouterSiteUrl || envSiteUrl || undefined,
      siteName: settings.openrouterSiteName || envSiteName || undefined,
    };
  } catch {
    return null;
  }
}

/**
 * OpenRouter API তে চ্যাট কমপ্লিশন রিকোয়েস্ট পাঠান
 */
async function chatCompletion(
  messages: ChatMessage[],
  settings: OpenRouterSettings
): Promise<string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${settings.apiKey}`,
  };

  if (settings.siteUrl) {
    headers["HTTP-Referer"] = settings.siteUrl;
  }
  if (settings.siteName) {
    headers["X-Title"] = settings.siteName;
  }

  const response = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      model: settings.model,
      messages,
      temperature: 0.7,
      max_tokens: 1024,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const errorMsg = errorData?.error?.message || `OpenRouter API error: ${response.status}`;
    throw new Error(errorMsg);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "";
}

/**
 * ফন্ট পেয়ারিং প্রম্পট তৈরি করুন
 */
function buildFontPairingMessages(input: FontPairingInput): ChatMessage[] {
  return [
    {
      role: "system",
      content: `You are an expert typographer and graphic designer. Your task is to suggest a suitable English font pairing from Google Fonts for a given Bengali font. Always respond in valid JSON format with exactly these three fields:
- "englishFontName": The name of the suggested English font from Google Fonts
- "reason": A brief explanation in Bengali (বাংলা) for why this font is a good pairing
- "googleFontLink": The full @import URL for the regular 400 weight, in the format: @import url('https://fonts.googleapis.com/css2?family=FontName:wght@400&display=swap');

Respond ONLY with the JSON object, no additional text or markdown.`,
    },
    {
      role: "user",
      content: `Suggest an English font pairing for this Bengali font:
- Name: ${input.bengaliFontName}
- Category: ${input.category}
- Designer: ${input.designer}

Consider stroke contrast, weight, and overall mood (formal, casual, decorative). Recommend an English font from Google Fonts that complements it harmoniously.`,
    },
  ];
}

/**
 * ফন্ট পেয়ারিং সুপারিশ পান (OpenRouter ব্যবহার করে)
 */
export async function suggestFontPairing(
  input: FontPairingInput
): Promise<FontPairingOutput> {
  const settings = await getOpenRouterSettings();

  if (!settings) {
    throw new Error(
      "OpenRouter API key বা মডেল সেট করা হয়নি। Cloudflare Pages Environment Variables-এ OPENROUTER_API_KEY সেট করুন অথবা অ্যাডমিন প্যানেল থেকে সেটিংস কনফিগার করুন।"
    );
  }

  const messages = buildFontPairingMessages(input);
  const rawResponse = await chatCompletion(messages, settings);

  // JSON পার্স করুন — মার্কডাউন কোড ব্লক থেকেও কাজ করবে
  let cleaned = rawResponse.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*\n?/, "").replace(/\n?```\s*$/, "");
  }

  try {
    const result = JSON.parse(cleaned);

    if (!result.englishFontName || !result.reason || !result.googleFontLink) {
      throw new Error("AI মডেল সম্পূর্ণ তথ্য দেয়নি। আবার চেষ্টা করুন।");
    }

    return {
      englishFontName: result.englishFontName,
      reason: result.reason,
      googleFontLink: result.googleFontLink,
    };
  } catch {
    throw new Error("AI মডেলের রেসপন্স পার্স করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
  }
}

/**
 * উপলব্ধ মডেলের তালিকা (admin panel-এ dropdown এর জন্য)
 */
export const POPULAR_OPENROUTER_MODELS = [
  { id: "google/gemini-2.5-flash-preview", name: "Gemini 2.5 Flash (Free)" },
  { id: "google/gemini-2.0-flash-001", name: "Gemini 2.0 Flash (Free)" },
  { id: "meta-llama/llama-4-maverick:free", name: "Llama 4 Maverick (Free)" },
  { id: "meta-llama/llama-3.3-70b-instruct:free", name: "Llama 3.3 70B (Free)" },
  { id: "deepseek/deepseek-chat-v3-0324:free", name: "DeepSeek V3 (Free)" },
  { id: "qwen/qwen3-235b-a22b:free", name: "Qwen3 235B (Free)" },
  { id: "microsoft/mai-ds-r1:free", name: "Microsoft MAI DS R1 (Free)" },
  { id: "anthropic/claude-sonnet-4", name: "Claude Sonnet 4 ($)" },
  { id: "anthropic/claude-3.5-sonnet", name: "Claude 3.5 Sonnet ($)" },
  { id: "openai/gpt-4o", name: "GPT-4o ($)" },
  { id: "openai/gpt-4o-mini", name: "GPT-4o Mini ($)" },
  { id: "google/gemini-2.5-pro-preview", name: "Gemini 2.5 Pro ($)" },
];
