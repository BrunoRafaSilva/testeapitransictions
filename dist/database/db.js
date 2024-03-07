"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbName = 'beatu';
const dbUser = process.env.DB_USER || 'root';
const dbPassword = 'brunosenhas';
const dbHost = process.env.DB_HOST;
const dbPort = Number(process.env.DB_PORT);
const sequelize = new sequelize_1.Sequelize(dbName, dbUser, dbPassword, {
    dialect: 'mysql',
    host: dbHost,
    port: dbPort,
});
sequelize.sync()
    .then(() => {
    console.log('Tabela sincronizada.');
})
    .catch((error) => {
    console.error('Erro ao sincronizar.', error);
});
exports.default = sequelize;
