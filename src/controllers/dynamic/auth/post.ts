import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

class AuthController {
    async post(req: Request, res: Response) {
        // Aqui você deve verificar as credenciais do usuário (por exemplo, verificar no banco de dados)
        // Estou apenas simulando um usuário autenticado com sucesso
        const user = {
            id: 1,
            username: 'bruno',
            email: 'bruno@exemplo.com',
        };

        // Crie um token JWT
        const token = jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '1h' });

        // Retorne o token JWT
        return res.json({ token });
    }
}

export default new AuthController();
