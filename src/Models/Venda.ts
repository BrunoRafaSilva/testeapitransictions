import Sequelize from 'sequelize';
import database from '../database/db';

const Venda = database.define('Venda', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: true,
        primaryKey: true,
    },
    cliente: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Clientes',
            key: 'id',
        },
    },
    produto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Produtos',
            key: 'id',
        },
    }, meio_pagamento: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    desconto: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    valor_desconto: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    valor_final: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    observacao: {
        type: Sequelize.STRING,
        allowNull: true,
    },

}, {
    tableName: 'VENDAS',
    timestamps: true,
    updatedAt: true,
});

export default Venda;
