import Sequelize from 'sequelize';
import database from '../database/db';

const Login = database.define('Login', {
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
    senha: Sequelize.STRING,
}, {
    tableName: 'LOGIN',
    modelName: 'Login',
    timestamps: true,
    updatedAt: true,
});

export default Login;
