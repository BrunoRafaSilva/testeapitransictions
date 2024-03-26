"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
const Produto_1 = __importDefault(require("../../../Models/Produto"));
const zodError_1 = __importDefault(require("../../../middlewares/zodError"));
const HttpError_1 = __importDefault(require("../../../middlewares/HttpError"));
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
    const atualizaProduto = Produto_1.default.findByPk(where.id).then((result) => {
        if (result === null) {
            throw new HttpError_1.default('Produto não encontrado.', 404);
        }
        else {
            return result;
        }
    });
    return atualizaProduto;
};
//# sourceMappingURL=put.js.map