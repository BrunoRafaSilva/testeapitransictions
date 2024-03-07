"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpError_1 = __importDefault(require("./HttpError"));
function ZodValidator(error, res) {
    const zodErros = error.errors.reduce((previousValue, currentValue) => `${previousValue} ${currentValue.path.join('.')} - ${currentValue.message}`, '');
    return new HttpError_1.default(zodErros, 400);
}
exports.default = ZodValidator;
