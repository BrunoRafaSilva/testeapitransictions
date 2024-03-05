import { Response, Request } from 'express';
import Produtos from '../../../Models/Produto';

export default async function findAll(req: Request, res: Response) {
    const clientes = await Produtos.findAll({ ...req.query });
    res.json(clientes);
}
