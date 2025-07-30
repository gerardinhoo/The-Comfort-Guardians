import axios from 'axios';
import { readTokens, writeTokens, isExpired } from './tokenStore.js';

export async function getValidAccessToken() {
  let tokens = readTokens();
  if (!tokens) throw new Error('No Jobber tokens saved yet');

  if (!isExpired(tokens)) return tokens.access_token;

  // refresh when expired/near-expired
  const form = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: tokens.refresh_token,
    client_id: process.env.JOBBER_CLIENT_ID,
    client_secret: process.env.JOBBER_CLIENT_SECRET,
  });

  const { data } = await axios.post(
    process.env.JOBBER_TOKEN_URL,
    form.toString(),
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );

  // Persist new tokens; keep previous refresh if API doesn’t return one
  const merged = writeTokens({
    access_token: data.access_token,
    refresh_token: data.refresh_token || tokens.refresh_token,
    expires_in: data.expires_in ?? 3600,
    token_type: data.token_type || 'Bearer',
  });

  return merged.access_token;
}
