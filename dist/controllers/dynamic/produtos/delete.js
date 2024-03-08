"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Produto_1 = __importDefault(require("../../../Models/Produto"));
const HttpError_1 = __importDefault(require("../../../middlewares/HttpError"));
exports.default = async (req, res) => {
    const where = {};
    if (req.query.id) {
        where.id = req.query.id;
    }
    const deleta = await Produto_1.default.destroy({ where: where }).then((result) => {
        if (result === 0) {
            throw new HttpError_1.default('Produto informado não encontrado', 400);
        }
    });
    return deleta;
};
