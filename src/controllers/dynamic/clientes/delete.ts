import z from 'zod';
import { WhereOptions } from 'sequelize';
import { Request, Response } from 'express';
import Cliente from '../../../Models/Cliente';

export default async (req: Request, res: Response) => {
    const where: WhereOptions = {};
    if (req.query.id) {
        where.id = req.query.id;
    }

    await Cliente.destroy({ where: where }).then((result) => {
        if (result === 0) {
            res.status(404).json({ error: true, message: 'Cliente informado não encontrado' });
        } else {
            res.status(200).json({ error: false, message: 'Cliente deletado com sucesso' });
        }
    });
};
