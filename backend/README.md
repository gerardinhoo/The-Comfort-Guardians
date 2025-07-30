# Comfort Guardians Backend

Node/Express backend to integrate the website with Jobber (OAuth + GraphQL).

## Local dev

```bash
cd backend
cp .env.example .env   # fill in real values
npm i
npm run dev
```

### Health check:

GET http://localhost:4000/health → { "ok": true }.

### OAuth connect

Open http://localhost:4000/integrations/jobber/connect and complete Jobber login.

Tokens are stored locally in backend/data/jobber-tokens.json (gitignored).

### Lead Intake (MVP)

JSON Body:

{
"firstName":"Jane",
"lastName":"Doe",
"email":"jane@example.com",
"phone":"555-0130",
"address":"123 Elm St, Orlando, FL",
"serviceType":"AC tune-up",
"details":"AC making noise",
"preferredDate":"2025-08-02",
"preferredTimeWindow":"9am-12pm"
}
