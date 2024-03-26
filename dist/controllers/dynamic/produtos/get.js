"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Produto_1 = __importDefault(require("../../../Models/Produto"));
const HttpError_1 = __importDefault(require("../../../middlewares/HttpError"));
exports.default = async (req, res) => {
    const limite = req.query.limit || 5;
    const foraSet = req.query.offset || 0;
    const where = {};
    if (req.query.id) {
        where.id = req.query.id;
    }
    const produtos = await Produto_1.default.findAll({
        limit: Number(limite),
        offset: Number(foraSet),
        where: where,
    });
    if (produtos.length === 0) {
        throw new HttpError_1.default('Nenhum produto enccontrado', 404);
    }
    return produtos;
};
//# sourceMappingURL=get.js.map