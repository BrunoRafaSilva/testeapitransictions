import { Request, Response, NextFunction } from 'express';

export interface Pagination {
    limit: number;
    offset: number;
}

export interface CustomRequest extends Request {
    pagination?: Pagination;
}

export const paginationMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    req.pagination = {
        limit: req.query.limit ? Number(req.query.limit) : 10, // Default limit is 10
        offset: req.query.offset ? Number(req.query.offset) : 0, // Default offset is 0
    };
    next();
};
