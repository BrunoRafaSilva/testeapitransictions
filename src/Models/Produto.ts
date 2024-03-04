import Sequelize from 'sequelize';
import database from '../database/db'; // Supondo que você tenha configurado corretamente o 'db'

const Produto = database.define('produto', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: true,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    preco: Sequelize.DECIMAL,
    descricao: Sequelize.STRING,

},{
    tableName: "produtos",
    paranoid: true,
    updatedAt: true
},);

export default Produto;
