import z from 'zod';
import { Response, Request } from 'express';
import Produtos from '../../../Models/Produto';

export default async (req: Request, res: Response) => {
    const produtoSchema = z.object({
        nome: z.string(),
        preco: z.number(),
        descricao: z.string().optional(),
    });

    const newProduto = produtoSchema.safeParse(req.query);

    if (!newProduto.success) return res.status(500).json({ error: true, message: 'Erro ao criar produto' });

    const result = await Produtos.create(newProduto);

    if (!result) { return res.status(500).json({ error: true, message: 'Erro ao criar produto' }); }
    else {
        return res.status(201).json({ error: false, message: result });
    }
};
