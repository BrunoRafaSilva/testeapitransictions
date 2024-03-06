import z from 'zod';
import { Request, Response } from 'express';
import { WhereOptions } from 'sequelize';
import Produto from '../../../Models/Produto';
import ZodValidator from '../../../middlewares/zodError';

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

    Produto.findAll({ where: where }).then((result) => {
        if (result.length > 0) {
            res.status(200).json({ error: false, data: result });
        } else {
            res.status(404).json({ error: true, message: 'Sem produtos encontrados' });
        }
    });

};
