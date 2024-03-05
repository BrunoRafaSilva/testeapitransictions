import express from 'express';
import router from './routers';
import database from './database/db';
import dotenv from 'dotenv';
dotenv.config({ path: './config/.env' });

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

// Usando o roteador dinamico definido
app.use(router);

app.listen(port, async () => {
    try {
        await database.sync();
        console.log('Tabela .');
    } catch (error) {
        console.error('Erro ao sincronizar.', error);
    }
    console.log(`Server is running on port ${port} .`);
});
