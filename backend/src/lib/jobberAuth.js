import axios from 'axios';
import { readTokens, writeTokens, isExpired } from './tokenStore.js'; // if you didn't add isExpired, see inline fallback below

function clean(v) {
  return (v || '').split('#')[0].trim();
}

const TOKEN_URL = clean(process.env.JOBBER_TOKEN_URL);
const CLIENT_ID = clean(process.env.JOBBER_CLIENT_ID);
const CLIENT_SECRET = clean(process.env.JOBBER_CLIENT_SECRET);
const REDIRECT_URI = clean(process.env.JOBBER_REDIRECT_URI);

// If you didn't export isExpired from tokenStore.js, uncomment this:
// function isExpired(tokens, skewSec = 60) {
//   if (!tokens || !tokens.access_token) return true;
//   const nowSec = Math.floor(Date.now() / 1000);
//   if (tokens.expires_at) return nowSec >= Number(tokens.expires_at) - skewSec;
//   if (tokens.expires_in && tokens.obtained_at) {
//     return nowSec >= Number(tokens.obtained_at) + Number(tokens.expires_in) - 60;
//   }
//   return false; // no expiry info -> assume valid
// }

async function refreshTokens(refresh_token) {
  const form = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: REDIRECT_URI, // some providers require it on refresh; harmless if ignored
  });

  const { data } = await axios.post(TOKEN_URL, form.toString(), {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });

  // Stamp timing fields for reliable expiry checks
  const nowSec = Math.floor(Date.now() / 1000);
  const stamped = {
    obtained_at: data.obtained_at ?? nowSec,
    expires_at:
      data.expires_at ??
      (data.expires_in ? nowSec + Number(data.expires_in) : undefined),
    ...data,
  };
  await writeTokens(stamped);
  return stamped;
}

/**
 * Returns a valid access token. Refreshes if needed.
 */
export async function getValidAccessToken() {
  let tokens = await readTokens();
  if (!tokens?.access_token) {
    throw new Error(
      'No tokens found. Visit /integrations/jobber/connect to authorize.'
    );
  }

  if (isExpired(tokens)) {
    if (!tokens.refresh_token) {
      throw new Error(
        'Access token expired and no refresh_token present. Reconnect OAuth.'
      );
    }
    try {
      tokens = await refreshTokens(tokens.refresh_token);
    } catch (e) {
      // Force re-auth if refresh fails
      throw new Error(
        'Refresh token failed. Reconnect OAuth (/integrations/jobber/connect). ' +
          (e.response?.data ? JSON.stringify(e.response.data) : e.message)
      );
    }
  }
  return tokens.access_token;
}
