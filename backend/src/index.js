import 'dotenv/config';
import express from 'express';
import jobberRoutes from './routes/jobber.js';
import cors from 'cors';

const app = express();

app.use(cors({ origin: '*' })); // MVP

// Basic health route
app.get('/health', (_req, res) => res.json({ ok: true }));

// OAuth + Jobber integration routes
app.use('/integrations/jobber', jobberRoutes);

// Start server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
  console.log('JOBBER_API_VERSION:', process.env.JOBBER_API_VERSION);
});
