// backend/src/routes/jobber.js
import express from 'express';
import axios from 'axios';
import { writeTokens } from '../lib/tokenStore.js';
import { getValidAccessToken } from '../lib/jobberAuth.js';

const router = express.Router();

import { readTokens } from '../lib/tokenStore.js'; // ensure this import is present

// Debug: see token + expiry info (no secrets)
router.get('/debug/token', async (_req, res) => {
  try {
    const t = await readTokens();
    res.json({
      has_token: !!t?.access_token,
      token_preview: t?.access_token
        ? t.access_token.slice(0, 6) + '…' + t.access_token.slice(-6)
        : null,
      token_type: t?.token_type,
      scope: t?.scope,
      obtained_at: t?.obtained_at,
      expires_in: t?.expires_in,
      expires_at: t?.expires_at,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Debug: confirm env/config we send to Jobber
router.get('/debug/env', (_req, res) => {
  res.json({
    JOBBER_API_BASE: process.env.JOBBER_API_BASE,
    JOBBER_GRAPHQL_PATH: process.env.JOBBER_GRAPHQL_PATH,
    JOBBER_API_VERSION:
      process.env.JOBBER_API_VERSION || '(unset, fallback will try list)',
  });
});

/* -------------------- helpers -------------------- */
function cleanEnv(v) {
  return (v || '').split('#')[0].trim();
}
const API_BASE =
  cleanEnv(process.env.JOBBER_API_BASE) || 'https://api.getjobber.com';
const GRAPHQL_PATH =
  cleanEnv(process.env.JOBBER_GRAPHQL_PATH) || '/api/graphql';

function normalizePhone(p) {
  return (p || '').replace(/\D+/g, '');
}

function hasName(firstName, lastName) {
  return Boolean(
    (firstName && firstName.trim()) || (lastName && lastName.trim())
  );
}

/**
 * Attach a note to a Request using the requestCreateNote mutation.
 * Tries common input field names for the note body (body/text/content) to be robust across versions.
 */
/**
 * Attach a note to a Request using requestCreateNote (positional args).
 * Tries common arg names for the note content. Never sends Express responses.
 */
/**
 * Attach a note to a Request using requestCreateNote(input: ...).
 * Your schema requires an `input` arg and `requestId` is EncodedId!.
 * We try common text field names in the input: body, text, content, message.
 * Non-fatal on failure; returns { ok: true, argUsed } on success.
 */
/**
 * Attaches a note to a Request (Style B only):
 *   requestCreateNote(requestId: EncodedId!, input: RequestCreateNoteInput!)
 * Tries common content keys in the input: body, text, content, message.
 */
/**
 * Attach a note to a Request.
 * Your schema requires: requestCreateNote(requestId: EncodedId!, input: RequestCreateNoteInput!)
 * and the text field is `message`.
 */
async function attachRequestNote({ accessToken, requestId, note }) {
  const mutation = `
    mutation RequestCreateNote($requestId: EncodedId!, $input: RequestCreateNoteInput!) {
      requestCreateNote(requestId: $requestId, input: $input) {
        request { id }
      }
    }
  `;

  const variables = {
    requestId,
    input: {
      message: note, // <-- confirmed by introspection
      // pinned: false, // optional
      // attachments: [], // optional
      // linkedTo: null,  // optional
    },
  };

  const resp = await postGqlWithVersionFallback(
    { query: mutation, variables },
    accessToken
  );

  if (resp?.data?.errors?.length) {
    return { ok: false, error: resp.data.errors };
  }
  const ok = resp?.data?.data?.requestCreateNote?.request?.id;
  return ok ? { ok: true } : { ok: false, error: resp?.data };
}

async function findOrCreateClient({
  accessToken,
  firstName,
  lastName,
  email,
  phone,
}) {
  // Search by email first (if provided)
  if (email) {
    const q = `
      query ($q: String!) {
        clients(query: $q, first: 10) {
          nodes {
            id
            name
            emails { address primary }
            phones { number primary }
          }
        }
      }
    `;
    const resp = await postGqlWithVersionFallback(
      { query: q, variables: { q: email } },
      accessToken
    );
    const match = resp?.data?.data?.clients?.nodes?.find((c) =>
      (c.emails || []).some(
        (e) => (e.address || '').toLowerCase() === email.toLowerCase()
      )
    );
    if (match?.id) return match.id;
  }

  // Fallback: search by phone (normalize digits)
  if (phone) {
    const digits = normalizePhone(phone);
    if (digits) {
      const q2 = `
        query ($q: String!) {
          clients(query: $q, first: 10) {
            nodes {
              id
              name
              phones { number primary }
              emails { address primary }
            }
          }
        }
      `;
      const resp2 = await postGqlWithVersionFallback(
        { query: q2, variables: { q: digits } },
        accessToken
      );
      const match2 = resp2?.data?.data?.clients?.nodes?.find((c) =>
        (c.phones || []).some((ph) => normalizePhone(ph.number) === digits)
      );
      if (match2?.id) return match2.id;
    }
  }

  // Create client if not found
  const createClientMutation = `
    mutation ($input: ClientCreateInput!) {
      clientCreate(input: $input) {
        client { id name }
      }
    }
  `;
  const clientInput = {
    firstName: firstName || '',
    lastName: lastName || ' ', // keep a placeholder last name
    emails: email ? [{ address: email, primary: true }] : [],
    phones: phone ? [{ number: phone, primary: true }] : [],
  };
  const createResp = await postGqlWithVersionFallback(
    { query: createClientMutation, variables: { input: clientInput } },
    accessToken
  );
  if (createResp.data?.errors?.length) {
    throw new Error(
      'Client create failed: ' + JSON.stringify(createResp.data.errors)
    );
  }
  const cc = createResp?.data?.data?.clientCreate;
  if (!cc?.client?.id) {
    throw new Error('Client create failed (no id in payload)');
  }
  return cc.client.id;
}

/* -------------------- OAuth -------------------- */
router.get('/connect', (_req, res) => {
  const url = new URL(cleanEnv(process.env.JOBBER_AUTH_URL));
  url.searchParams.set('client_id', cleanEnv(process.env.JOBBER_CLIENT_ID));
  url.searchParams.set(
    'redirect_uri',
    cleanEnv(process.env.JOBBER_REDIRECT_URI)
  );
  url.searchParams.set('response_type', 'code');
  const scope = cleanEnv(process.env.JOBBER_OAUTH_SCOPE);
  if (scope) url.searchParams.set('scope', scope);
  res.redirect(url.toString());
});

router.get('/callback', async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).send('Missing code');

  try {
    const form = new URLSearchParams({
      grant_type: 'authorization_code',
      code: String(code),
      redirect_uri: cleanEnv(process.env.JOBBER_REDIRECT_URI),
      client_id: cleanEnv(process.env.JOBBER_CLIENT_ID),
      client_secret: cleanEnv(process.env.JOBBER_CLIENT_SECRET),
    });

    const { data } = await axios.post(
      cleanEnv(process.env.JOBBER_TOKEN_URL),
      form.toString(),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    writeTokens(data);
    console.log('Saved Jobber tokens to data/jobber-tokens.json');
    res.send('Connected to Jobber! Tokens saved locally for this environment.');
  } catch (err) {
    console.error(
      'OAuth error:',
      err.response?.status,
      err.response?.data || err.message
    );
    res.status(500).send('OAuth flow failed');
  }
});

/* ------------- GraphQL version fallback ------------- */
async function postGqlWithVersionFallback(body, accessToken) {
  const url = `${API_BASE}${GRAPHQL_PATH}`;
  const versions = [
    cleanEnv(process.env.JOBBER_API_VERSION), // preferred (e.g., 2025-01-20)
    '2024-12-05',
    '2024-11-12',
    '2024-06-10',
    '2023-11-15',
    '2023-08-18',
  ].filter(Boolean);

  let lastResp, lastVersion;
  for (const ver of versions) {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-JOBBER-GRAPHQL-VERSION': ver, // required header
      'User-Agent': 'ComfortGuardiansBackend/1.0',
    };

    console.log('POST', url, 'with GraphQL version', ver);
    const resp = await axios.post(url, body, {
      headers,
      validateStatus: () => true,
    });
    lastResp = resp;
    lastVersion = ver;

    const msg = resp?.data?.message || '';
    const looksLikeGraphQL = resp?.data?.data || resp?.data?.errors;
    const versionMissing = /does not exist/i.test(msg);

    if (
      resp.status >= 200 &&
      resp.status < 300 &&
      looksLikeGraphQL &&
      !versionMissing
    ) {
      console.log('GraphQL version used:', ver);
      return resp; // success
    }
    if (versionMissing) continue; // try next version
  }
  console.warn('All versions failed. Last version tried:', lastVersion);
  console.warn(
    'All versions failed. Last version tried:',
    lastVersion,
    'status:',
    lastResp?.status
  );
  console.warn('Last response body:', JSON.stringify(lastResp?.data));
  return lastResp;
}

/* -------------- TEST: List Clients ------------- */
router.get('/test/clients-graphql', async (_req, res) => {
  try {
    const accessToken = await getValidAccessToken();

    // Minimal query first (avoid fields that may not exist on some versions)
    const query = `
      query ListClients($first: Int!) {
        clients(first: $first) {
          nodes { id name }
        }
      }
    `;

    const resp = await postGqlWithVersionFallback(
      { query, variables: { first: 5 } },
      accessToken
    );

    // Bubble up details instead of a generic 500
    if (resp.status < 200 || resp.status >= 300) {
      console.error('GraphQL HTTP error:', resp.status, resp.data);
      return res.status(resp.status).json({
        error: 'GraphQL HTTP error',
        status: resp.status,
        details: resp.data,
      });
    }
    if (resp.data?.errors) {
      console.error(
        'GraphQL errors:',
        JSON.stringify(resp.data.errors, null, 2)
      );
      return res.status(500).json({
        error: 'GraphQL errors',
        details: resp.data.errors,
      });
    }
    if (!resp.data?.data) {
      console.error('GraphQL unexpected:', resp.data);
      return res.status(500).json({
        error: 'Unexpected GraphQL response',
        details: resp.data,
      });
    }

    res.json(resp.data.data.clients.nodes);
  } catch (err) {
    console.error(
      'Clients query exception:',
      err.response?.status,
      err.response?.data || err.message
    );
    res
      .status(500)
      .json({ error: 'Exception in clients query', details: err.message });
  }
});

/* -------- TEST: Create Client (no payload errors field) ------- */
router.post('/test/clients-create', express.json(), async (req, res) => {
  try {
    const accessToken = await getValidAccessToken();

    const mutation = `
      mutation CreateClient($input: ClientCreateInput!) {
        clientCreate(input: $input) {
          client { id name }
        }
      }
    `;

    const input = req.body?.input || {
      firstName: 'MVP',
      lastName: 'Test',
      emails: [{ address: 'mvp-test@example.com', primary: true }],
      phones: [{ number: '555-0100', primary: true }],
    };

    const resp = await postGqlWithVersionFallback(
      { query: mutation, variables: { input } },
      accessToken
    );

    if (resp.status < 200 || resp.status >= 300) {
      console.error('GraphQL HTTP error:', resp.status, resp.data);
      return res
        .status(500)
        .json({ error: 'GraphQL HTTP error', details: resp.data });
    }
    if (resp.data?.errors) {
      console.error(
        'GraphQL errors:',
        JSON.stringify(resp.data.errors, null, 2)
      );
      return res
        .status(500)
        .json({ error: 'GraphQL error', details: resp.data.errors });
    }

    res.json(resp.data.data.clientCreate);
  } catch (err) {
    console.error(
      'Client create error:',
      err.response?.status,
      err.response?.data || err.message
    );
    res.status(500).json({ error: 'Failed to create client via GraphQL' });
  }
});

/* ----------------- MVP Lead Intake ----------------- */
// POST /integrations/jobber/lead
// Receives form data from your website and creates a Client + Request in Jobber
// POST /integrations/jobber/lead
// Receives form data from your website and creates a Client + Request in Jobber
// POST /integrations/jobber/lead
router.post('/lead', express.json(), async (req, res) => {
  try {
    const accessToken = await getValidAccessToken();
    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      serviceType,
      details,
      preferredDate,
      preferredTimeWindow,
    } = req.body;

    // --- Minimal validation (MVP) ---
    if (!hasName(firstName, lastName)) {
      return res.status(400).json({ error: 'Name required (first or last)' });
    }
    if (!email && !phone) {
      return res.status(400).json({ error: 'Provide email or phone' });
    }

    // --- Find or create client (email → phone fallback) ---
    const clientId = await findOrCreateClient({
      accessToken,
      firstName,
      lastName,
      email,
      phone,
    });

    // --- Create request (title only; your schema doesn’t accept description) ---
    const createRequestMutation = `
      mutation ($input: RequestCreateInput!) {
        requestCreate(input: $input) {
          request { id title }
        }
      }
    `;

    const titleParts = [
      serviceType || 'New Service Request',
      details && details.trim() ? `- ${details.trim()}` : '',
    ].filter(Boolean);

    const requestInput = {
      clientId,
      title: titleParts.join(' ').slice(0, 80),
    };

    const createReqResp = await postGqlWithVersionFallback(
      { query: createRequestMutation, variables: { input: requestInput } },
      accessToken
    );

    if (createReqResp.data?.errors?.length) {
      return res.status(500).json({
        error: 'Request create failed',
        details: createReqResp.data.errors,
      });
    }

    const rq = createReqResp?.data?.data?.requestCreate;
    if (!rq?.request?.id) {
      return res.status(500).json({
        error: 'Request create failed (no request id in payload)',
        details: createReqResp?.data,
      });
    }

    const requestId = rq.request.id;

    // --- Attach a note with full details (non-fatal if it fails) ---
    const noteLines = [
      address ? `Address: ${address}` : '',
      preferredDate ? `Preferred date: ${preferredDate}` : '',
      preferredTimeWindow ? `Preferred time: ${preferredTimeWindow}` : '',
      details ? `Details: ${details}` : '',
    ].filter(Boolean);

    if (noteLines.length) {
      try {
        const noteText = noteLines.join('\n');
        const noteResp = await attachRequestNote({
          accessToken,
          requestId,
          note: noteText,
        });

        if (!noteResp.ok) {
          console.warn('requestCreateNote failed (non-fatal):', noteResp.error);
        } else {
          console.log('requestCreateNote success using arg:', noteResp.argUsed);
        }
      } catch (e) {
        console.warn(
          'requestCreateNote threw (non-fatal):',
          e?.response?.data || e.message
        );
      }
    }

    // --- Single final response ---
    return res.json({
      ok: true,
      clientId,
      requestId,
      requestTitle: rq.request.title,
    });
  } catch (err) {
    console.error(
      'Lead intake error:',
      err?.response?.status,
      err?.response?.data || err.message
    );
    return res.status(500).json({ error: 'Lead intake failed' });
  }
});

// GET /integrations/jobber/introspect/mutations
router.get('/introspect/mutations', async (_req, res) => {
  try {
    const accessToken = await getValidAccessToken();
    const introspect = `
      query {
        __schema {
          mutationType {
            fields {
              name
              args { name }
            }
          }
        }
      }
    `;
    const resp = await postGqlWithVersionFallback(
      { query: introspect },
      accessToken
    );
    if (resp.status < 200 || resp.status >= 300) {
      return res
        .status(500)
        .json({ error: 'Introspection failed', details: resp.data });
    }
    const fields = resp?.data?.data?.__schema?.mutationType?.fields || [];
    // Filter to request-related mutations to keep output short
    const requestMutations = fields.filter((f) => /request/i.test(f.name));
    res.json({ requestMutations, allCount: fields.length });
  } catch (err) {
    console.error(
      'Introspection error:',
      err.response?.status,
      err.response?.data || err.message
    );
    res.status(500).json({ error: 'Introspection error' });
  }
});

// GET /integrations/jobber/introspect/requestCreateNote
router.get('/introspect/requestCreateNote', async (_req, res) => {
  try {
    const accessToken = await getValidAccessToken();

    const schemaQuery = `
      query {
        __schema {
          mutationType {
            fields {
              name
              args {
                name
                type {
                  kind
                  name
                  ofType { kind name ofType { kind name } }
                }
              }
            }
          }
        }
      }
    `;

    const resp = await postGqlWithVersionFallback(
      { query: schemaQuery },
      accessToken
    );
    const fields = resp?.data?.data?.__schema?.mutationType?.fields || [];
    const field = fields.find((f) => f.name === 'requestCreateNote');

    // If we find the field, and it has an input arg, fetch the input type fields too
    if (field) {
      const inputArg = field.args.find((a) => a.name === 'input');
      let inputTypeName = inputArg?.type?.name || inputArg?.type?.ofType?.name;
      let inputType = null;

      if (inputTypeName) {
        const inputTypeQuery = `
          query ($name: String!) {
            __type(name: $name) {
              name
              kind
              inputFields {
                name
                type {
                  kind
                  name
                  ofType { kind name ofType { kind name } }
                }
              }
            }
          }
        `;
        const tResp = await postGqlWithVersionFallback(
          { query: inputTypeQuery, variables: { name: inputTypeName } },
          accessToken
        );
        inputType = tResp?.data?.data?.__type || null;
      }

      return res.json({ field, inputType });
    }

    return res.json({
      error: 'requestCreateNote not found',
      fields: fields.map((f) => f.name),
    });
  } catch (e) {
    return res.status(500).json({
      error: 'Introspection error',
      details: e?.response?.data || e.message,
    });
  }
});

export default router;
