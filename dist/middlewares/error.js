"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpError_1 = __importDefault(require("./HttpError"));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const middlewareErrors = (err, res) => {
    if (!(err instanceof Error)) {
        err = new Error(`Uma exceção foi provocada sem passar a instância de Error: ${JSON.stringify(err)}`);
    }
    // formatação do erro
    const result = {
        name: err.name,
        message: err.message,
        stack: err.stack,
    };
    Object.keys(err).forEach((value) => {
        result[value] = err[value];
    });
    res.status((true
        && err instanceof HttpError_1.default
        && Number.isInteger(err.status)
        && err.status >= 400
        && err.status <= 599) ? err.status : 500);
    return result;
};
exports.default = middlewareErrors;