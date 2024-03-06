import Sequelize from 'sequelize';
import database from '../database/db';

const Produto = database.define('Produto', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: true,
        primaryKey: true,
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    preco: Sequelize.STRING,
    descricao: Sequelize.STRING,
}, {
    tableName: 'PRODUTOS',
    timestamps: true,
    updatedAt: true,
});

export default Produto;
