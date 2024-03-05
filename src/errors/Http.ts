import z from 'zod';

export default class extends Error {
    constructor(message: string, error: object) {
        if (error instanceof z.ZodError) {
            const zodErros = error.errors.reduce(
                (previousValue, currentValue) => `${previousValue} ${currentValue.path.join('.')} - ${currentValue.message}`,
                '',
            );
            super(zodErros);
            // this.status = 400;
        } else {
            super(message);
            // this.status = status || 500;
            console.log('error', message, error);
        }
    }
}
