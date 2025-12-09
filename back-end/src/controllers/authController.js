import jwt from 'jsonwebtoken'; // Importe isso no topo
import bcrypt from 'bcryptjs';
import * as Usuario from '../models/Usuario.js';

export async function registrarUsuario(req, res) {
    const { email, senha } = req.body;

    // Validação básica
    if (!email || !senha) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    // 1. Criptografar a senha (O pulo do gato!)
    const senhaHash = await bcrypt.hash(senha, 10); // 10 é o "custo" (força) do hash

    try {
        const novoUsuario = await Usuario.createUser(email, senhaHash);
        res.status(201).json({ message: 'Usuário cadastrado com sucesso!', user: novoUsuario });
    } catch (error) {
        // Erro comum: Email já existe (constraint UNIQUE)
        res.status(400).json({ message: 'Erro ao cadastrar. Esse email já existe?' });
    }
}

export async function login(req, res) {
    const { email, senha } = req.body;

    // 1. Buscar usuário no banco
    const usuario = await Usuario.findUserByEmail(email);
   
    // Se não achar o usuário, nega o acesso
    if (!usuario) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // 2. Comparar a senha enviada com a criptografada (Hash)
    // O bcrypt faz a mágica de comparar "123" com "$2b$10$..."
    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
        return res.status(401).json({ message: 'Credenciais inválidas senha' });
    }

    // 3. Gerar o Token (O Crachá)
    const token = jwt.sign(
        { id: usuario.id }, // O que guardamos no crachá
        process.env.JWT_SECRET, // O segredo do .env para assinar
        { expiresIn: '1h' } // Validade
    );

    res.json({ token });
}
