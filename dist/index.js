"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routers_1 = __importDefault(require("./routers"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: './config/.env' });
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = process.env.PORT || 3000;
// Usando o roteador dinamico definido
app.use(routers_1.default);
app.listen(port, async () => {
    console.log(`Server is running on port ${port} .`);
});
