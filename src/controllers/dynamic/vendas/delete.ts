import { WhereOptions } from 'sequelize';
import { Request, Response } from 'express';
import Venda from '../../../Models/Venda';
import HttpError from '../../../middlewares/HttpError';

export default async (req: Request, res: Response) => {
    const where: WhereOptions = {};
    if (req.query.id) {
        where.id = req.query.id;
    }

    const deleta = await Venda.destroy({ where: where }).then((result) => {
        if (result === 0) {
            throw new HttpError('Venda informado não encontrado', 400);
        }
    });

    return deleta;
};
