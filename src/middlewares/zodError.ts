import z from 'zod';
import { Response } from 'express';

export default function ZodValidator(error: z.ZodError, res: Response) {
    const zodErros = error.errors.reduce(
        (previousValue, currentValue) => `${previousValue} ${currentValue.path.join('.')} - ${currentValue.message}`, '');
    return res.status(400).json({ error: true, message: zodErros });
}
