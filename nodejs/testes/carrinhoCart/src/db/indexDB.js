import { Pool } from 'pg';

const pool = new Pool({
  user: 'root',
  host: 'localhost',
  database: 'cart',
  password: 'admin',
  port: 5432,
});

export default pool