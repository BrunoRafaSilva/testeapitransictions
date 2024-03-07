import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = (
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (error instanceof Error) {
        console.error(error);
        res.status(500).json({ error: true, message: error.message });
        next();
    }
};
