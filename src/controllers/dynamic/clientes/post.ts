import z, { ZodError } from 'zod';
import { Response, Request } from 'express';
import Clientes from '../../../Models/Cliente';

export default async (req: Request, res: Response) => {
    const clienteSchema = z.object({
        nome: z.string(),
        contato: z.string().optional(),
        observacao: z.string().optional(),
    });

    const newCliente = clienteSchema.safeParse(req.query);

    if (!newCliente.success) return res.status(500).json({ error: true, message: 'Erro ao criar cliente' });

    const result = await Clientes.create(newCliente);

    if (!result) {
        return res.status(500).json({ error: true, message: 'Erro ao criar cliente' });
    }
    else {
        return res.status(201).json({ error: false, message: result });
    }
};
