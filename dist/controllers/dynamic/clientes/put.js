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
    const where = {};
    if (req.query.id) {
        where.id = req.query.id;
    }
    const clienteSchema = zod_1.default.object({
        nome: zod_1.default.string().optional(),
        contato: zod_1.default.string().optional(),
        observacao: zod_1.default.string().optional(),
    });
    const updateCliente = clienteSchema.safeParse(req.body);
    if (!updateCliente.success)
        return (0, zodError_1.default)(updateCliente.error, res);
    await Cliente_1.default.update(updateCliente.data, { where: where });
    const atualizaCliente = Cliente_1.default.findByPk(where.id).then((result) => {
        if (result) {
            return result;
        }
        else {
            throw new HttpError_1.default('Cliente não encontrado', 404);
        }
    });
    return atualizaCliente;
};
