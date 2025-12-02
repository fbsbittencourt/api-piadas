import { Router } from 'express';
import {
    submeterPiada, buscarPiadaAleatoria,
    listarPiadasPendentes, aprovarPiada
} from '../controllers/piadaController.js';

const router = Router();

// Rotas Públicas
// Define que, ao fazer um POST em '/piadas', executa a função 'submeterPiada'
router.post('/piadas', submeterPiada);
// Rota nova: GET /piadas
router.get('/piadas', buscarPiadaAleatoria);

// Rotas de Admin (Por enquanto abertas)
router.get('/piadas/pendentes', listarPiadasPendentes);
router.put('/piadas/:id/aprovar', aprovarPiada); // PUT indica atualização

export default router;
