import express, { Application } from 'express';
import fs from 'fs';
import path from 'path';
import { Response, Request, NextFunction } from 'express';
import { errorMiddleware } from '../middlewares/error';

const controllersDir = path.join(__dirname, '..', 'controllers', 'dynamic');

const registerDynamicRoutes = (app: Application, dir: string, prefix: string = '') => {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        // primeiro ele busca onde tá o arquivo e somente após encontrar é que entra no else
        if (fs.statSync(fullPath).isDirectory()) {
            // Se for um diretório, registre as rotas recursivamente
            registerDynamicRoutes(app, fullPath, `${prefix}/${file}`);
        } else {
            // se for um arquivo, defina a rota com base no nome do arquivo
            const [method, routeName] = file.split('.');
            const routePath = `${prefix}`;
            app.use(routePath, async (req: Request, res: Response, next: NextFunction) => {
                try {
                    // eslint-disable-next-line @typescript-eslint/no-var-requires
                    const handler = require(fullPath).default; // Importa o controlador
                    await handler(req, res, next);
                } catch (err) {
                    errorMiddleware(err, req, res, next);
                }
            }); // Adiciona a rota ao aplicativo (app
            // Adiciona a rota ao router usando o método apropriado
            // const methodHandler = methodHandlers[method.toUpperCase()];

            // if (methodHandler) {
            //     methodHandler.apply(router, [routePath, paginationMiddleware, handler]);
            //     console.log(`Rota registrada: ${method} ${routePath} => ${fullPath}`);
            // }
        }
    });
};

export default (app: Application) => {
    // Mapeamento de métodos HTTP para funções do roteador
    // const methodHandlers: { [key: string]: (path: string, ...handlers: ((req: Request, res: Response, next: NextFunction) => void)[]) => void } = {
    //     GET: router.get.bind(router),
    //     POST: router.post.bind(router),
    //     PUT: router.put.bind(router),
    //     DELETE: router.delete.bind(router),
    // };

    // Middleware de paginação

    // Função para registrar rotas dinamicamente

    // Registre as rotas dinâmicas a partir do diretório de controladores
    registerDynamicRoutes(app, controllersDir);

};
