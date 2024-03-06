import Sequelize from 'sequelize';
import database from '../database/db';

const Cliente = database.define('Cliente', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: true,
        primaryKey: true,
    }, nome: {
        type: Sequelize.STRING,
        allowNull: false,
    }, contato: {
        type: Sequelize.STRING,
        allowNull: true,
    }, observacao: Sequelize.STRING,
}, {
    tableName: 'CLIENTES',
    timestamps: true,
    updatedAt: true,
});

export default Cliente;
