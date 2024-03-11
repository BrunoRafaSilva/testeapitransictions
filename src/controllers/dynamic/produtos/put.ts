import z from 'zod';
import { Request, Response } from 'express';
import { WhereOptions } from 'sequelize';
import Produto from '../../../Models/Produto';
import ZodValidator from '../../../middlewares/zodError';
import HttpError from '../../../middlewares/HttpError';

export default async (req: Request, res: Response) => {
    const where: WhereOptions = {};
    if (req.query.id) {
        where.id = req.query.id;
    }

    const produtoSchema = z.object({
        nome: z.string().optional(),
        preco: z.string().optional(),
        descricao: z.string().optional(),
    });

    const updateProduto = produtoSchema.safeParse(req.body);

    if (!updateProduto.success) return ZodValidator(updateProduto.error, res);

    await Produto.update(updateProduto.data, { where: where });

    const atualizaProduto = Produto.findByPk(where.id).then((result) => {
        if (result === null) {
            throw new HttpError('Produto não encontrado.', 404);
        } else {
            return result;
        }
    });

    return atualizaProduto;

};
