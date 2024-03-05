import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

const controllersDir = path.join(__dirname, '..', 'controllers', 'dynamic');
// Mapeamento de métodos HTTP para funções do roteador
const methodHandlers: { [key: string]: unknown } = {
    GET: router.get,
    POST: router.post,
    PUT: router.put,
    DELETE: router.delete,
};

// Função para registrar rotas dinamicamente
const registerDynamicRoutes = (dir: string, prefix: string = '') => {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        // primeiro ele busca onde tá o arquivo e somente após encontrar é que entra no else
        if (fs.statSync(fullPath).isDirectory()) {
            // Se for um diretório, registre as rotas recursivamente
            registerDynamicRoutes(fullPath, `${prefix}/${file}`);
        } else {
            // se for um arquivo, defina a rota com base no nome do arquivo
            const [method, routeName] = file.split('.');
            const routePath = `${prefix}`;
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const handler = require(fullPath).default; // Importa o controlador
            // Adiciona a rota ao router usando o método apropriado
            const methodHandler = methodHandlers[method.toUpperCase()];

            if (methodHandler) {
                methodHandler.call(router, routePath, handler);
                console.log(`Rota registrada: ${method} ${routePath} => ${fullPath}`);
            }
        }
    });
};

// Registre as rotas dinâmicas a partir do diretório de controladores
registerDynamicRoutes(controllersDir);

export default router;
