import { Pool } from 'pg';

const pool = new Pool({
  user: 'root',
  host: '172.17.0.2',
  database: 'cart',
  password: 'admin',
  port: 5432,
});

export default pool