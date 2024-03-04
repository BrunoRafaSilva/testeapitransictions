import express from 'express';
import router from './routers';
import database from './database/db';
require('dotenv').config({ path: '{./config/.env}' })
database.sync()
const app = express();
const port = process.env.PORT || 3000;

// Usando o roteador dinamico definido 
app.use(router)

app.listen(port, () => {
    console.log(`Server is running on port ${port} .`)
})