import express from 'express';
import cors from 'cors'; // <--- 1. Importe isso

const app = express();

// Middleware essencial para entender JSON
app.use(express.json());

app.use(cors()); // <--- 2. Adicione isso (Libera acesso para qualquer origem)

export default app; // Exportação padrão
