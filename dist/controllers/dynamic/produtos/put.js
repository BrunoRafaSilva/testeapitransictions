"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
const Produto_1 = __importDefault(require("../../../Models/Produto"));
const zodError_1 = __importDefault(require("../../../middlewares/zodError"));
exports.default = async (req, res) => {
    const where = {};
    if (req.query.id) {
        where.id = req.query.id;
    }
    const produtoSchema = zod_1.default.object({
        nome: zod_1.default.string().optional(),
        preco: zod_1.default.string().optional(),
        descricao: zod_1.default.string().optional(),
    });
    const updateProduto = produtoSchema.safeParse(req.body);
    if (!updateProduto.success)
        return (0, zodError_1.default)(updateProduto.error, res);
    await Produto_1.default.update(updateProduto.data, { where: where });
    Produto_1.default.findByPk(where.id).then((result) => {
        if (result === null) {
            res.status(404).json({ error: true, message: 'Produto informado não encontrado' });
        }
        else {
            res.status(200).json({ error: false, data: result });
        }
    });
};
