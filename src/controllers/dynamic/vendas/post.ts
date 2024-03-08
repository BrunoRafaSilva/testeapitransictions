import z from 'zod';
import { Response, Request } from 'express';
import Venda from '../../../Models/Venda';
import zodValidator from '../../../middlewares/zodError';
import HttpError from '../../../middlewares/HttpError';

export default async (req: Request, res: Response) => {
    const vendaSchema = z.object({
        cliente: z.string().transform((val) => parseInt(val)),
        produto: z.string().transform((val) => parseInt(val)),
        meio_pagamento: z.string(),
        desconto: z.string().optional(),
        valor_desconto: z.string().optional(),
        valor_final: z.string(),
        observacao: z.string().optional(),
    });

    const newVenda = vendaSchema.safeParse(req.body);

    if (!newVenda.success) return zodValidator(newVenda.error, res);

    const result = await Venda.create(newVenda.data);

    if (!result) {
        return new HttpError('Nenhum produto criado', 500);
    }
    else {
        return result;
    }
};
