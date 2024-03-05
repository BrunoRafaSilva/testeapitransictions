import { Response, Request } from 'express';
import { WhereOptions } from 'sequelize';
import Produtos from '../../../Models/Produto';

export default async function findAll(req: Request, res: Response) {
    const where: WhereOptions = {};
    if (req.query.id) {
        where.id = req.query.id;
    }

    let clientes; // Declare the 'clientes' variable

    try {
        clientes = await Produtos.findAll({ // Assign the value to 'clientes'
            limit: req.pagination?.limit,
            offset: req.pagination?.offset,
            where: where,
        });
    } catch (error) {
        return res.status(500).json({ message: `${error} Erro ao buscar produtos` }); // Add a closing parenthesis
    }

    if (clientes.length === 0) {
        return res.status(404).json({ message: 'Nenhum produto encontrado' });
    }

    res.json(clientes);
}
