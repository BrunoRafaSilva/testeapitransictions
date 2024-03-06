import { Response, Request } from 'express';
import { WhereOptions } from 'sequelize';
import Produtos from '../../../Models/Produto';

export default async (req: Request, res: Response) => {
    const where: WhereOptions = {};
    if (req.query.id) {
        where.id = req.query.id;
    }

    let produtos;

    try {
        produtos = await Produtos.findAll({
            limit: req.pagination?.limit,
            offset: req.pagination?.offset,
            where: where,
        });
    } catch (error) {
        return res.status(500).json({ message: `${error} Erro ao buscar produtos` }); // Add a closing parenthesis
    }

    if (produtos.length === 0) {
        return res.status(404).json({ message: 'Nenhum produto encontrado' });
    }

    res.status(200).json({ error: false, message: produtos });
};
