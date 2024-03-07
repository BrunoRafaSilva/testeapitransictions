"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
const Produto_1 = __importDefault(require("../../../Models/Produto"));
const zodError_1 = __importDefault(require("../../../middlewares/zodError"));
exports.default = async (req, res) => {
    const produtoSchema = zod_1.default.object({
        nome: zod_1.default.string(),
        preco: zod_1.default.string(),
        descricao: zod_1.default.string().optional(),
    });
    const newProduto = produtoSchema.safeParse(req.body);
    if (!newProduto.success)
        return (0, zodError_1.default)(newProduto.error, res);
    const result = await Produto_1.default.create(newProduto.data);
    if (!result)
        return res.status(500).json({ error: true, message: 'Erro ao criar produto' });
    else
        return res.status(201).json({ error: false, message: result });
};
