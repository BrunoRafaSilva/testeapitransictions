"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cliente_1 = __importDefault(require("../../../Models/Cliente"));
exports.default = async (req, res) => {
    const where = {};
    if (req.query.id) {
        where.id = req.query.id;
    }
    await Cliente_1.default.destroy({ where: where }).then((result) => {
        if (result === 0) {
            res.status(404).json({ error: true, message: 'Cliente informado não encontrado' });
        }
        else {
            res.status(200).json({ error: false, message: 'Cliente deletado com sucesso' });
        }
    });
};
