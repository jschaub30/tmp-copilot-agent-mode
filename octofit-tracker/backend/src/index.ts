import express from 'express';
import { apiPort, getApiBaseUrl } from './config/apiUrl.js';
import database from './config/database.js';
import apiRoutes from './routes/api.js';

const app = express();
const port = apiPort;

app.use(express.json());
app.use('/api', apiRoutes);

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    database: database.readyState === 1 ? 'connected' : 'connecting',
    apiBaseUrl: getApiBaseUrl(),
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`OctoFit API listening at ${getApiBaseUrl()}`);
});