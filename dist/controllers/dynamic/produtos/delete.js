"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Produto_1 = __importDefault(require("../../../Models/Produto"));
exports.default = async (req, res) => {
    const where = {};
    if (req.query.id) {
        where.id = req.query.id;
    }
    const deleta = await Produto_1.default.destroy({ where: where }).then((result) => {
        if (result === 0) {
            res.status(404).json({ error: true, message: 'Produto informado não encontrado'
            }, {
                res, : .status(200).json({ error: false, message: 'Produto deletado com sucesso' })
            });
        }
    });
};
