import z from 'zod';
import { Request, Response } from 'express';
import { WhereOptions } from 'sequelize';
import Cliente from '../../../Models/Cliente';
import ZodValidator from '../../../middlewares/zodError';

export default async (req: Request, res: Response) => {
    const where: WhereOptions = {};
    if (req.query.id) {
        where.id = req.query.id;
    }

    const clienteSchema = z.object({
        nome: z.string().optional(),
        contato: z.string().optional(),
        observacao: z.string().optional(),
    });

    const updateCliente = clienteSchema.safeParse(req.body);

    if (!updateCliente.success) return ZodValidator(updateCliente.error, res);

    await Cliente.update(updateCliente.data, { where: where });

    Cliente.findByPk(where.id).then((result) => {
        if (result) {
            res.status(404).json({ error: true, message: 'Cliente informado não encontrado' });
        } else {
            res.status(200).json({ error: false, data: result });
        }
    });
};
