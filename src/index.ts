import express, { Response, Request, NextFunction } from 'express';
import sequelize from './database/db';
import router from './routers';
import dotenv from 'dotenv';
// import { paginationMiddleware } from './middlewares/pagination';
dotenv.config({ path: './config/.env' });

// export const paginationMiddleware = (req: Request, res: Response, next: NextFunction) => {
//     req.pagination = {
//         limit: req.query.limit ? Number(req.query.limit) : 10, // Default limit is 10
//         offset: req.query.offset ? Number(req.query.offset) : 0, // Default offset is 0
//     };
//     next();
// };

const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

router(app);
// Usando o roteador dinamico definido
// app.use(paginationMiddleware);

// app.use(middlewareErrors);

app.listen(port, async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        console.log(`Server is running on port ${port} .`);
    }
});
