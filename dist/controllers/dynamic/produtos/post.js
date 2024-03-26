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
    const produtoSchema = zod_1.default.object({
        nome: zod_1.default.string(),
        preco: zod_1.default.string(),
        descricao: zod_1.default.string().optional(),
    });
    const newProduto = produtoSchema.safeParse(req.body);
    if (!newProduto.success)
        return (0, zodError_1.default)(newProduto.error, res);
    const result = await Produto_1.default.create(newProduto.data);
    if (!result) {
        return new HttpError_1.default('Nenhum produto criado', 500);
    }
    else {
        return result;
    }
};
//# sourceMappingURL=post.js.map