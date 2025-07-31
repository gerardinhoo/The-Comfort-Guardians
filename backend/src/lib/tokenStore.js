import fs from 'fs/promises';
import path from 'path';

const TOKENS_FILE = process.env.TOKENS_FILE || '/data/jobber-tokens.json';

export async function writeTokens(data) {
  const dir = path.dirname(TOKENS_FILE);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(TOKENS_FILE, JSON.stringify(data, null, 2), 'utf8');
}

export async function readTokens() {
  try {
    const txt = await fs.readFile(TOKENS_FILE, 'utf8');
    return JSON.parse(txt);
  } catch {
    return null;
  }
}

export function isExpired(tokens, skewSec = 60) {
  if (!tokens || !tokens.access_token) return true;

  const nowSec = Math.floor(Date.now() / 1000);
  if (tokens.expires_at) {
    return nowSec >= Number(tokens.expires_at) - skewSec;
  }
  if (tokens.expires_in) {
    const obtained = Number(tokens.obtained_at ?? 0);
    return (
      obtained === 0 || nowSec >= obtained + Number(tokens.expires_in) - skewSec
    );
  }
  // If we have no expiry info, assume NOT expired
  return false;
}
