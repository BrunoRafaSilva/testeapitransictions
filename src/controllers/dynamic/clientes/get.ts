import { Response, Request } from 'express';
import { WhereOptions } from 'sequelize';
import Clientes from '../../../Models/Cliente';
import HttpError from '../../../middlewares/HttpError';

export default async (req: Request, res: Response) => {
    const where: WhereOptions = {};
    if (req.query.id) {
        where.id = req.query.id;
    }

    const clientes = await Clientes.findAll({
        limit: req.pagination?.limit,
        offset: req.pagination?.offset,
        where: where,
    });

    if (clientes.length === 0) {
        throw new HttpError('Nenhum cliente encontrado', 404);
    }

    return clientes;
};
