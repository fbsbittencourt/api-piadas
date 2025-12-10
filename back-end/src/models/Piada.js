import { openDb } from '../config/database.js';


// Função responsável apenas por INSERIR no banco
export async function createPiada(pergunta, resposta) {
    const db = await openDb();

    // Executa o INSERT
    // O '?' é usado para evitar SQL Injection (segurança básica)
    const result = await db.run(
        'INSERT INTO piadas (pergunta, resposta) VALUES (?, ?)',
        pergunta,
        resposta
    );

    // Retorna um objeto com o ID que acabou de ser criado
    return {
        id: result.lastID,
        pergunta,
        resposta
    };
}

export async function getPiadaAleatoria() {
    const db = await openDb();

    // 1. SELECT: Seleciona os campos id, pergunta e resposta
    // 2. FROM piadas: Da tabela piadas
    // 3. WHERE aprovada = 1: Apenas as que já foram moderadas!
    // 4. ORDER BY RANDOM(): Embaralha tudo
    // 5. LIMIT 1: Pega só uma
    const piada = await db.get(
        `
            SELECT id, pergunta, resposta
            FROM piadas WHERE aprovada = 1 ORDER BY RANDOM() LIMIT 1
         `
    );

    return piada;
}

export async function getDezPiadasAleatorias() {
    const db = await openDb();

    // 1. SELECT: Seleciona os campos id, pergunta e resposta
    // 2. FROM piadas: Da tabela piadas
    // 3. WHERE aprovada = 1: Apenas as que já foram moderadas!
    // 4. ORDER BY RANDOM(): Embaralha tudo
    // 5. LIMIT 1: Pega só uma
    const piada = await db.all(
        `
            SELECT id, pergunta, resposta
            FROM piadas WHERE aprovada = 1 ORDER BY RANDOM() LIMIT 10
         `
    );

    return piada;
}

// 1. Lista apenas as piadas que ainda NÃO foram moderadas
export async function getPiadasPendentes() {
    const db = await openDb();
    return await db.all('SELECT * FROM piadas WHERE aprovada = 0');
}

// 2. Atualiza o status da piada (O carimbo)
export async function moderarPiada(id, aprovada) {
    const db = await openDb();
    
    // UPDATE: O comando que altera dados existentes
    const result = await db.run(
        'UPDATE piadas SET aprovada = ? WHERE id = ?', 
        aprovada, // 1 (Aprovada) ou 0 (Pendente)
        id
    );
    
    // Retorna true se alguma linha foi afetada (sucesso)
    return result.changes > 0;
}
