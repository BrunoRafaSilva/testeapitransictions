import express from 'express';
import router from './routers';
import dotenv from 'dotenv';
dotenv.config({ path: './config/.env' });

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

// Usando o roteador dinamico definido
app.use(router);

app.listen(port, async () => {
    console.log(`Server is running on port ${port} .`);
});
