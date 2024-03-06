import z from 'zod';
import { Response, Request } from 'express';
import Produtos from '../../../Models/Produto';
import zodValidator from '../../../middlewares/zodError';

export default async (req: Request, res: Response) => {
    const produtoSchema = z.object({
        nome: z.string(),
        preco: z.string(),
        descricao: z.string().optional(),
    });

    const newProduto = produtoSchema.safeParse(req.body);

    if (!newProduto.success) return zodValidator(newProduto.error, res);

    const result = await Produtos.create(newProduto.data);

    if (!result) return res.status(500).json({ error: true, message: 'Erro ao criar produto' });
    else return res.status(201).json({ error: false, message: result });
};
