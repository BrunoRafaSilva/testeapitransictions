"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Produto_1 = __importDefault(require("../../../Models/Produto"));
exports.default = async (req, res) => {
    var _a, _b;
    const where = {};
    if (req.query.id) {
        where.id = req.query.id;
    }
    let produtos;
    try {
        produtos = await Produto_1.default.findAll({
            limit: (_a = req.pagination) === null || _a === void 0 ? void 0 : _a.limit,
            offset: (_b = req.pagination) === null || _b === void 0 ? void 0 : _b.offset,
            where: where,
        });
    }
    catch (error) {
        return res.status(500).json({ message: `${error} Erro ao buscar produtos` }); // Add a closing parenthesis
    }
    if (produtos.length === 0) {
        return res.status(404).json({ message: 'Nenhum produto encontrado' });
    }
    res.status(200).json({ error: false, message: produtos });
};
