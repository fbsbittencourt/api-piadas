import jwt from 'jsonwebtoken';

export default function authMiddleware(req, res, next) {
    // 1. Busca o token no cabeçalho "Authorization"
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    // 2. O token vem como "Bearer eyJhbGci..."
    // Precisamos separar a palavra "Bearer" do código
    const parts = authorization.split(' ');

    if (parts.length !== 2) {
        return res.status(401).json({ message: 'Erro no formato do token' });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ message: 'Token mal formatado' });
    }

    // 3. Verifica se o token é válido e não expirou
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }

        // 4. Se deu tudo certo, salva o ID do usuário na requisição
        req.userId = decoded.id;
        
        // 5. MÁGICA: O next() manda a requisição seguir para o Controller
        return next();
    });
}
