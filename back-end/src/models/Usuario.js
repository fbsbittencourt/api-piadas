import { query } from '../config/database.js';

class Usuario {
    // Busca usuário pelo email (usado no login)
    static async buscarPorEmail(email) {
        const resultado = await query(
            'SELECT * FROM usuarios WHERE email = $1', 
            [email]
        );
        return resultado.rows[0];
    }

    // Cria novo usuário (usado no registro)
    static async criar(email, senhaHash) {
        const resultado = await query(
            'INSERT INTO usuarios (email, senha) VALUES ($1, $2) RETURNING id, email', 
            [email, senhaHash]
        );
        return resultado.rows[0];
    }
    
    // Busca por ID (se precisarmos no futuro)
    static async buscarPorId(id) {
        const resultado = await query(
            'SELECT id, email FROM usuarios WHERE id = $1', 
            [id]
        );
        return resultado.rows[0];
    }
}

export default Usuario;
