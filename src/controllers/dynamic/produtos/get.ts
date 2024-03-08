import { Response, Request } from 'express';
import { WhereOptions } from 'sequelize';
import Produtos from '../../../Models/Produto';
import HttpError from '../../../middlewares/HttpError';

export default async (req: Request, res: Response) => {
    const limite = req.query.limit || 5;
    const foraSet = req.query.offset || 0;

    const where: WhereOptions = {};
    if (req.query.id) {
        where.id = req.query.id;
    }

    const produtos = await Produtos.findAll({
        limit: Number(limite),
        offset: Number(foraSet),
        where: where,
    });

    if (produtos.length === 0) {
        throw new HttpError('Nenhum produto encontrado', 404);
    }

    return produtos;
};
