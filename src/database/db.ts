import { Sequelize } from 'sequelize';

const dbName = 'beatu';
const dbUser = process.env.DB_USER || 'root';
const dbPassword = 'brunosenhas';
const dbHost = process.env.DB_HOST;
const dbPort = Number(process.env.DB_PORT);

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
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
export default sequelize;
