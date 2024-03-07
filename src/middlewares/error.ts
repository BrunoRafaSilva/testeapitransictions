import express from 'express';
import HttpError from './HttpError';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const middlewareErrors = (err: any, res: express.Response) => {
    if (!(err instanceof Error)) {
        err = new Error(`Uma exceção foi provocada sem passar a instância de Error: ${JSON.stringify(err)}`);
    }

    // formatação do erro
    const result: { [key: string]: unknown } = {
        name: err.name,
        message: err.message,
        stack: err.stack,
    };

    Object.keys(err).forEach((value) => {
        result[value] = err[value];
    });

    res.status(
        (true
            && err instanceof HttpError
            && Number.isInteger(err.status)
            && err.status >= 400
            && err.status <= 599
        ) ? err.status : 500,
    );

    return result;
};

export default middlewareErrors;
