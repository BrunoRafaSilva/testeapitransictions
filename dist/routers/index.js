"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const error_1 = __importDefault(require("../middlewares/error"));
const PATH_DYNAMIKC_ROUTERS = path_1.default.join(__dirname, '..', 'controllers', 'dynamic');
const REGEX = /{(.*?)}/g;
const middlewareRouters = async (req, res) => {
    const pathFolder = `${PATH_DYNAMIKC_ROUTERS}${req.path.toLowerCase()}`;
    const pathController = path_1.default.join(pathFolder, `${req.method.toLowerCase()}.js`);
    const result = await (await Promise.resolve(`${`${pathController}`}`).then(s => __importStar(require(s)))).default(req, res);
    return result;
};
exports.default = (app) => {
    app.use(async (req, res) => {
        let responseBody;
        try {
            if (req.method !== 'OPTIONS') {
                responseBody = await middlewareRouters(req, res);
                req.query.limit = '1';
            }
            else {
                res.status(200);
                responseBody = '';
            }
        }
        catch (err) {
            responseBody = (0, error_1.default)(err, res);
        }
        if (typeof (responseBody) === 'number') {
            responseBody = responseBody.toString();
        }
        res.send(responseBody);
    });
};
