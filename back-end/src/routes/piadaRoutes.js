import { Router } from 'express';
import {
    submeterPiada, buscarPiadaAleatoria,
    listarPiadasPendentes, aprovarPiada,
    buscarDezPiadasAleatorias
} from '../controllers/piadaController.js';
// 1. Importe o middleware
import authMiddleware from '../middlewares/authMiddleware.js'; 


const router = Router();

// Rotas Públicas
// Define que, ao fazer um POST em '/piadas', executa a função 'submeterPiada'
router.post('/piadas', submeterPiada);
// Rota nova: GET /piadas
router.get('/piadas', buscarPiadaAleatoria);

router.get('/dezpiadas', buscarDezPiadasAleatorias);

// Rotas de Admin (Por enquanto abertas)
router.get('/piadas/pendentes', authMiddleware, listarPiadasPendentes);
router.put('/piadas/:id/aprovar', authMiddleware, aprovarPiada); // PUT indica atualização

export default router;
