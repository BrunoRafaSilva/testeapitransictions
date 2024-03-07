import { Response, Request } from 'express';
import { WhereOptions } from 'sequelize';
import Produtos from '../../../Models/Produto';
import HttpError from '../../../middlewares/HttpError';

export default async (req: Request, res: Response) => {
    const where: WhereOptions = {};
    if (req.query.id) {
        where.id = req.query.id;
    }

    const produtos = await Produtos.findAll({
        limit: req.pagination?.limit,
        offset: req.pagination?.offset,
        where: where,
    });

    if (produtos.length === 0) {
        throw new HttpError('Nenhum produto encontrado', 404);
    }

    return produtos;
};
