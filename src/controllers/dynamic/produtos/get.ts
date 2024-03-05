import { Response, Request } from 'express';
import { Op, WhereOptions } from 'sequelize';
import Produtos from '../../../Models/Produto';

export default async function findAll(req: Request, res: Response) {
    const where: WhereOptions = {};
    if (req.query.id) {
        where.id = req.query.id;
    }

    const clientes = await Produtos.findAll({
        limit: req.pagination?.limit,
        offset: req.pagination?.offset,
        where: where,
    });
    if (clientes.length === 0) {
        return res.status(404).json({ message: 'Nenhum produto encontrado' });
    }

    res.json(clientes);
}
