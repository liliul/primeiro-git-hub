import express from 'express';
import db from '../db/conection_db.js';

const routerHealth = express.Router();

routerHealth.get('/health', async (req, res) => {
  const healthCheck = {
    server: '🟢 online',
    database: '🔴 offline',
    timestamp: new Date().toISOString(),
    dbLatencyMs: null,
  };

  const start = performance.now();

  try {
    const result = await db.query('SELECT 1');
    if (result.rowCount === 1) {
      healthCheck.database = '🟢 online';
      healthCheck.dbLatencyMs = Math.round(performance.now() - start);
    }
  } catch (err) {
    console.error('Erro no health check do banco:', err);
  }

  const isHealthy = healthCheck.database === '🟢 online';

  res.status(isHealthy ? 200 : 500).json(healthCheck);
});

export default routerHealth;
