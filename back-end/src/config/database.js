import pg from 'pg';
import dns from 'node:dns';

// Força IPv4 para evitar erro de conexão local com Supabase
dns.setDefaultResultOrder('ipv4first');

const { Pool } = pg;

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Exportamos o query para ser usado nos MODELS
export const query = async (text, params) => {
  return await db.query(text, params);
};

export default db;
