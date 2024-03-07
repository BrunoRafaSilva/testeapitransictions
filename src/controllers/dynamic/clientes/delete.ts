import z from 'zod';
import { WhereOptions } from 'sequelize';
import { NextFunction, Request, Response } from 'express';
import Cliente from '../../../Models/Cliente';
import HttpError from '../../../middlewares/HttpError';

export default async (req: Request, res: Response, next: NextFunction) => {
    const where: WhereOptions = {};
    if (req.query.id) {
        where.id = req.query.id;
    }

    const deleta = await Cliente.destroy({ where: where }).then((result) => {
        if (result === 0) {
            throw new HttpError('Nenhum cliente deletado', 404);
        }
    });

    return deleta;
};
