import { Request, Response, NextFunction } from 'express';

class ErrorHandler {
    handle() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (err: any, req: Request, res: Response, next: NextFunction) => {
            console.error(err.stack); // Log error stack trace to the console
            res.status(500).send('Something broke!');
        };
    }
}

export default new ErrorHandler();
