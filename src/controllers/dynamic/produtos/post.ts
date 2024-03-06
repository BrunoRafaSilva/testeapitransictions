import z from 'zod';
import { Response, Request } from 'express';
import Produtos from '../../../Models/Produto';

export default async (req: Request, res: Response) => {
    const produtoSchema = z.object({
        nome: z.string(),
        preco: z.number(),
        descricao: z.string().optional(),
    }).parse(req.query);

    const result = await Produtos.create(produtoSchema);
    if (!result) res.status(500).json({ error: true, message: 'Erro ao criar produto' });
    else res.status(201).json({ error: false, message: result });
};
