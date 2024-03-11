import z from 'zod';
import { Request, Response } from 'express';
import { WhereOptions } from 'sequelize';
import Venda from '../../../Models/Venda';
import ZodValidator from '../../../middlewares/zodError';
import HttpError from '../../../middlewares/HttpError';

export default async (req: Request, res: Response) => {
    const where: WhereOptions = {};
    if (req.query.id) {
        where.id = req.query.id;
    }

    const vendaSchema = z.object({
        cliente: z.string().transform((val) => parseInt(val)).optional(),
        produto: z.string().transform((val) => parseInt(val)).optional(),
        meio_pagamento: z.enum(['DINHEIRO', 'CARTAO DE CREDITO', 'CARTAO DE DEBITO', 'PIX']).optional(),
        desconto: z.string().transform((val) => Boolean(val)).optional(),
        valor_desconto: z.string().optional(),
        valor_final: z.string().optional(),
        observacao: z.string().optional(),
    });

    const updateVenda = vendaSchema.safeParse(req.body);

    if (!updateVenda.success) return ZodValidator(updateVenda.error, res);

    await Venda.update(updateVenda.data, { where: where });

    const atualizaVenda = Venda.findByPk(where.id).then((result) => {
        if (result === null) {
            throw new HttpError('Venda não encontrada.', 404);
        } else {
            return result;
        }
    });

    return atualizaVenda;

};
