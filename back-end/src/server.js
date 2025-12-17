import 'dotenv/config';

import app from './app.js'; // Importação com .js

import piadaRoutes from './routes/piadaRoutes.js'; // Importa as rotas
import authRoutes from './routes/authRoutes.js';

const PORT = process.env.PORT;

app.get('/', (req, resposta) => {  
  resposta.send(`
    <h1>Bem-vindo à API de Piadas!</h1>
    <p>Use o endpoint <code>/api/piadas</code> para acessar as piadas.</p>
    <input type="text" placeholder="Digite algo..." />
    <button>Enviar</button>
  `);
})

// Usa as rotas de piadas com o prefixo '/api'
app.use('/api', piadaRoutes);

app.use('/api', authRoutes);

// app.listen(PORT, () => {
//     console.log(`Servidor online na porta http://localhost:${PORT}/`);
// });

// Mantenha isto para testar localmente
if (process.env.NODE_ENV !== 'production') {
  app.listen(process.env.PORT, () => console.log(`Servidor online na porta http://localhost:${process.env.PORT}/`));
}

// OBRIGATÓRIO: Exportar o app para a Vercel (serverless)
export default app;
