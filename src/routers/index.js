"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var error_1 = require("../middlewares/error");
var PATH_DYNAMIKC_ROUTERS = path_1.default.join(__dirname, '..', 'controllers', 'dynamic');
var REGEX = /{(.*?)}/g;
var middlewareRouters = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var pathFolder, pathController, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                pathFolder = "".concat(PATH_DYNAMIKC_ROUTERS).concat(req.path.toLowerCase());
                pathController = path_1.default.join(pathFolder, "".concat(req.method.toLowerCase(), ".js"));
                return [4 /*yield*/, Promise.resolve("".concat("".concat(pathController))).then(function (s) { return require(s); })];
            case 1: return [4 /*yield*/, (_a.sent()).default(req, res)];
            case 2:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
exports.default = (function (app) {
    app.use(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var responseBody, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    if (!(req.method !== 'OPTIONS')) return [3 /*break*/, 2];
                    return [4 /*yield*/, middlewareRouters(req, res)];
                case 1:
                    responseBody = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    res.status(200);
                    responseBody = '';
                    _a.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    responseBody = (0, error_1.default)(err_1, res);
                    return [3 /*break*/, 5];
                case 5:
                    if (typeof (responseBody) === 'number') {
                        responseBody = responseBody.toString();
                    }
                    res.send(responseBody);
                    return [2 /*return*/];
            }
        });
    }); });
});