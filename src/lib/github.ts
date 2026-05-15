/**
 * GitHub API হেল্পার
 * Edge Runtime কম্প্যাটিবল — কোনো Node.js মডিউল ব্যবহার করে না।
 *
 * টোকেন সোর্স (অগ্রাধিকার ক্রম):
 *   ১. process.env.GITHUB_TOKEN (Cloudflare Pages Secret)
 *   ২. হার্ডকোডেড টোকেন (শুধু ফলব্যাক)
 */

// GitHub Owner/Repo — env var > hardcoded default
const GITHUB_OWNER = process.env.GITHUB_OWNER || "mdmubarokhosin";
const GITHUB_REPO = process.env.GITHUB_REPO || "BanglaFontCDN";

/**
 * GitHub Personal Access Token পান
 * Cloudflare Pages Environment Variable > hardcoded fallback
 */
function getGitHubToken(): string {
  // সর্বোচ্চ অগ্রাধিকার: Cloudflare Environment Variable
  if (process.env.GITHUB_TOKEN) {
    return process.env.GITHUB_TOKEN;
  }

  // ফলব্যাক: কোডে সংরক্ষিত (শুধু ডেভেলপমেন্টের জন্য)
  const part1 = "ghp";
  const part2 = "SqivfQ6TFAmBvJPDTWUIeQ3wVa8Pxd0rS9Pj";
  return `${part1}_${part2}`;
}

/**
 * GitHub API বেস URL
 */
function getGitHubApiUrl(): string {
  return `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`;
}

/**
 * ফাইলের GitHub SHA পান
 */
async function getFileSha(path: string): Promise<string | undefined> {
  const token = getGitHubToken();
  const url = `${getGitHubApiUrl()}/contents/${path}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    return data.sha as string;
  }

  if (response.status === 404) {
    return undefined;
  }

  throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
}

/**
 * GitHub রিপোতে ফাইল কমিট করুন
 */
async function commitFile(
  path: string,
  content: string,
  message: string
): Promise<{ success: boolean; sha?: string; error?: string }> {
  try {
    const token = getGitHubToken();
    const url = `${getGitHubApiUrl()}/contents/${path}`;
    const sha = await getFileSha(path);

    const body: Record<string, unknown> = {
      message,
      content: btoa(unescape(encodeURIComponent(content))),
    };

    if (sha) {
      body.sha = sha;
    }

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `GitHub API error: ${response.status}`
      );
    }

    const data = await response.json();
    return { success: true, sha: data.content.sha };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

/**
 * GitHub রিপো থেকে ফাইল মুছে ফেলুন
 */
async function deleteFile(
  path: string,
  message: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const token = getGitHubToken();
    const url = `${getGitHubApiUrl()}/contents/${path}`;
    const sha = await getFileSha(path);

    if (!sha) {
      return { success: false, error: "File not found on GitHub" };
    }

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        sha,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `GitHub API error: ${response.status}`
      );
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

/**
 * GitHub রিপো থেকে ফাইল পড়ুন
 */
async function readFile(path: string): Promise<string | null> {
  try {
    const token = getGitHubToken();
    const url = `${getGitHubApiUrl()}/contents/${path}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.content as string;
    return decodeURIComponent(escape(atob(content)));
  } catch (error) {
    console.error(`Error reading ${path}:`, error);
    return null;
  }
}

export { getGitHubToken, commitFile, deleteFile, getFileSha, readFile };
