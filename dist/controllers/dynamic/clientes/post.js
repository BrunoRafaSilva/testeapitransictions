"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
const Cliente_1 = __importDefault(require("../../../Models/Cliente"));
const zodError_1 = __importDefault(require("../../../middlewares/zodError"));
const HttpError_1 = __importDefault(require("../../../middlewares/HttpError"));
exports.default = async (req, res) => {
    const clienteSchema = zod_1.default.object({
        nome: zod_1.default.string(),
        contato: zod_1.default.string().optional(),
        observacao: zod_1.default.string().optional(),
    });
    const newCLiente = clienteSchema.safeParse(req.body);
    if (!newCLiente.success)
        return (0, zodError_1.default)(newCLiente.error, res);
    const result = await Cliente_1.default.create(newCLiente.data);
    if (!result) {
        throw new HttpError_1.default('Nenhum cliente criado', 500);
    }
    else {
        return result;
    }
};
