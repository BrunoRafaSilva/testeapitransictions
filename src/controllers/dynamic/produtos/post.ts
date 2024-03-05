import bodyParser from 'body-parser';
import z from 'zod';
import { Response, Request } from 'express';
import Produtos from '../../../Models/Produto';

export default async (req: Request, res: Response) => {
    Produtos.create({
        nome: req.body.nome,
        preco: req.body.preco,
        descricao: req.body.descricao,
    }).then((result) => res.json(result));
};
