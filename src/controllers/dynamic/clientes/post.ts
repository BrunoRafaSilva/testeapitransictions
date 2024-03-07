import z, { ZodError } from 'zod';
import { Response, Request } from 'express';
import Clientes from '../../../Models/Cliente';
import zodValidator from '../../../middlewares/zodError';
import HttpError from '../../../middlewares/HttpError';

export default async (req: Request, res: Response) => {
    const clienteSchema = z.object({
        nome: z.string(),
        contato: z.string().optional(),
        observacao: z.string().optional(),
    });

    const newCLiente = clienteSchema.safeParse(req.body);

    if (!newCLiente.success) return zodValidator(newCLiente.error, res);

    const result = await Clientes.create(newCLiente.data);

    if (!result) {
        throw new HttpError('Nenhum cliente criado', 500);
    }
    else {
        return result;
    }
};
