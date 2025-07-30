// backend/src/lib/jobberGraphql.js
import axios from 'axios';

export const jobberGql = axios.create({
  baseURL: `${process.env.JOBBER_API_BASE}/api/graphql`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Jobber-Api-Version': process.env.JOBBER_API_VERSION,
  },
});
