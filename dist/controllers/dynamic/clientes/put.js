"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
const Cliente_1 = __importDefault(require("../../../Models/Cliente"));
const zodError_1 = __importDefault(require("../../../middlewares/zodError"));
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
    Cliente_1.default.findByPk(where.id).then((result) => {
        if (result) {
            res.status(404).json({ error: true, message: 'Cliente informado não encontrado' });
        }
        else {
            res.status(200).json({ error: false, data: result });
        }
    });
};
