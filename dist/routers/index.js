"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const error_1 = require("../middlewares/error");
const router = express_1.default.Router();
const controllersDir = path_1.default.join(__dirname, '..', 'controllers', 'dynamic');
// Mapeamento de métodos HTTP para funções do roteador
const methodHandlers = {
    GET: router.get.bind(router),
    POST: router.post.bind(router),
    PUT: router.put.bind(router),
    DELETE: router.delete.bind(router),
};
// Middleware de paginação
const paginationMiddleware = (req, res, next) => {
    req.pagination = {
        limit: req.query.limit ? Number(req.query.limit) : 10, // Default limit is 10
        offset: req.query.offset ? Number(req.query.offset) : 0, // Default offset is 0
    };
    next();
};
// Função para registrar rotas dinamicamente
const registerDynamicRoutes = (dir, prefix = '') => {
    fs_1.default.readdirSync(dir).forEach(file => {
        const fullPath = path_1.default.join(dir, file);
        // primeiro ele busca onde tá o arquivo e somente após encontrar é que entra no else
        if (fs_1.default.statSync(fullPath).isDirectory()) {
            // Se for um diretório, registre as rotas recursivamente
            registerDynamicRoutes(fullPath, `${prefix}/${file}`);
        }
        else {
            // se for um arquivo, defina a rota com base no nome do arquivo
            const [method, routeName] = file.split('.');
            const routePath = `${prefix}`;
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const handler = require(fullPath).default; // Importa o controlador
            // Adiciona a rota ao router usando o método apropriado
            const methodHandler = methodHandlers[method.toUpperCase()];
            if (methodHandler) {
                methodHandler.apply(router, [routePath, paginationMiddleware, handler]);
                console.log(`Rota registrada: ${method} ${routePath} => ${fullPath}`);
            }
        }
    });
};
// Registre as rotas dinâmicas a partir do diretório de controladores
registerDynamicRoutes(controllersDir);
router.use(error_1.errorMiddleware);
exports.default = router;
