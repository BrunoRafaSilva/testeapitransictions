import { Response, Request } from 'express';
import { WhereOptions } from 'sequelize';
import Clientes from '../../../Models/Cliente';

export default async (req: Request, res: Response) => {
    const where: WhereOptions = {};
    if (req.query.id) {
        where.id = req.query.id;
    }

    let clientes;

    try {
        clientes = await Clientes.findAll({
            limit: req.pagination?.limit,
            offset: req.pagination?.offset,
            where: where,
        });
    } catch (error) {
        return res.status(500).json({ error: true, message: `${error} Erro ao buscar clientes` });
    }

    if (clientes.length === 0) {
        return res.status(404).json({ error: true, message: 'Nenhum cliente encontrado' });
    }

    res.status(200).json({ error: false, message: clientes });
};
