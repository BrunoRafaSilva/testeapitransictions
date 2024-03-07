import { WhereOptions } from 'sequelize';
import { Request, Response } from 'express';
import Produto from '../../../Models/Produto';
import HttpError from '../../../middlewares/HttpError';

export default async (req: Request, res: Response) => {
    const where: WhereOptions = {};
    if (req.query.id) {
        where.id = req.query.id;
    }

    const deleta = await Produto.destroy({ where: where }).then((result) => {
        if (result === 0) {
            throw new HttpError('Produto informado não encontrado', 400);
        }
    });

    return deleta;
};
