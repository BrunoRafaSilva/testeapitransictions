"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routers_1 = __importDefault(require("./routers"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: './config/.env' });
// export const paginationMiddleware = (req: Request, res: Response, next: NextFunction) => {
//     req.pagination = {
//         limit: req.query.limit ? Number(req.query.limit) : 10, // Default limit is 10
//         offset: req.query.offset ? Number(req.query.offset) : 0, // Default offset is 0
//     };
//     next();
// };
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = process.env.PORT || 3000;
(0, routers_1.default)(app);
// Usando o roteador dinamico definido
// app.use(paginationMiddleware);
// app.use(middlewareErrors);
app.listen(port, async () => {
    console.log(`Server is running on port ${port} .`);
});
