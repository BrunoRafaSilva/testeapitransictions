import z from 'zod';
import { Response } from 'express';
import HttpError from './HttpError';

export default function ZodValidator(error: z.ZodError, res: Response) {
    const zodErros = error.errors.reduce(
        (previousValue, currentValue) => `${previousValue} ${currentValue.path.join('.')} - ${currentValue.message}`, '');
    return new HttpError(zodErros, 400);
}
