"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errorMiddleware = (error, req, res, next) => {
    console.error(error);
    res.status(500).json({ error: true, message: 'Erro interno' });
    next();
};
exports.errorMiddleware = errorMiddleware;
