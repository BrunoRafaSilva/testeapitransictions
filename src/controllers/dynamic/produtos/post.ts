import z from 'zod';
import { Response, Request } from 'express';
import Produtos from '../../../Models/Produto';
import zodValidator from '../../../middlewares/zodError';
import HttpError from '../../../middlewares/HttpError';

export default async (req: Request, res: Response) => {
    const produtoSchema = z.object({
        nome: z.string(),
        preco: z.string(),
        descricao: z.string().optional(),
    });

    const newProduto = produtoSchema.safeParse(req.body);

    if (!newProduto.success) return zodValidator(newProduto.error, res);

    const result = await Produtos.create(newProduto.data);

    if (!result) {
        return new HttpError('Nenhum produto criado', 500);
    }
    else {
        return result;
    }
};
