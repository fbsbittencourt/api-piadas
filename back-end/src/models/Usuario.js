import { openDb } from '../config/database.js';

export async function createUser(email, senhaHash) {
    const db = await openDb();
    const result = await db.run(
        'INSERT INTO usuarios (email, senha) VALUES (?, ?)', 
        email, 
        senhaHash
    );
    return { id: result.lastID, email };
}

export async function findUserByEmail(email) {
    const db = await openDb();
    // Precisamos buscar a senha para comparar depois
    return await db.get('SELECT * FROM usuarios WHERE email = ?', email);
}
