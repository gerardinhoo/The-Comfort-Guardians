import fs from 'fs';
import path from 'path';

const TOKENS_PATH = path.join(process.cwd(), 'data', 'jobber-tokens.json');

export function readTokens() {
  try {
    const raw = fs.readFileSync(TOKENS_PATH, 'utf8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function writeTokens(tokens) {
  fs.mkdirSync(path.dirname(TOKENS_PATH), { recursive: true });
  // add computed expiry timestamp
  const payload = {
    ...tokens,
    // expires_in is seconds; store absolute epoch ms (minus 60s safety)
    expires_at: Date.now() + (tokens.expires_in ?? 3600) * 1000 - 60 * 1000,
  };
  fs.writeFileSync(TOKENS_PATH, JSON.stringify(payload, null, 2), {
    mode: 0o600,
  });
  return payload;
}

export function isExpired(tokens) {
  if (!tokens?.expires_at) return true;
  return Date.now() >= tokens.expires_at;
}
