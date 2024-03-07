"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cliente_1 = __importDefault(require("../../../Models/Cliente"));
const HttpError_1 = __importDefault(require("../../../middlewares/HttpError"));
exports.default = async (req, res) => {
    var _a, _b;
    const where = {};
    if (req.query.id) {
        where.id = req.query.id;
    }
    const clientes = await Cliente_1.default.findAll({
        limit: (_a = req.pagination) === null || _a === void 0 ? void 0 : _a.limit,
        offset: (_b = req.pagination) === null || _b === void 0 ? void 0 : _b.offset,
        where: where,
    });
    if (clientes.length === 0) {
        throw new HttpError_1.default('Nenhum cliente encontrado', 404);
    }
    return clientes;
};
