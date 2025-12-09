import express from 'express';

const app = express();

// Middleware essencial para entender JSON
app.use(express.json());

export default app; // Exportação padrão
