"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const db_1 = __importDefault(require("../database/db"));
const Cliente = db_1.default.define('Cliente', {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        allowNull: true,
        primaryKey: true,
    }, nome: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    }, contato: {
        type: sequelize_1.default.STRING,
        allowNull: true,
    }, observacao: sequelize_1.default.STRING,
}, {
    tableName: 'CLIENTES',
    timestamps: true,
    updatedAt: true,
});
exports.default = Cliente;
