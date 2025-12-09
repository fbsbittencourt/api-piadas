import 'dotenv/config';

import app from './app.js'; // Importação com .js

import piadaRoutes from './routes/piadaRoutes.js'; // Importa as rotas
import authRoutes from './routes/authRoutes.js';

// Importa a função de configuração do banco
import { setupDatabase } from './config/database.js';

// Inicializa o banco de dados antes de tudo
setupDatabase();

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

app.listen(PORT, () => {
    console.log(`Servidor online na porta http://localhost:${PORT}/`);
});
