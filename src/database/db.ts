import { Sequelize } from "sequelize";

const dbName = process.env.DATABASE || ''; 
const dbUser = process.env.DB_USER || '';
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbPort = Number(process.env.DB_PORT);

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    dialect: 'mysql',
    host: dbHost,
    port: dbPort
});

export default sequelize;
