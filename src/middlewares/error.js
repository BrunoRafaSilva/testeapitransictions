"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpError_1 = require("./HttpError");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var middlewareErrors = function (err, res) {
    if (!(err instanceof Error)) {
        err = new Error("Uma exce\u00E7\u00E3o foi provocada sem passar a inst\u00E2ncia de Error: ".concat(JSON.stringify(err)));
    }
    // formatação do erro
    var result = {
        name: err.name,
        message: err.message,
        stack: err.stack,
    };
    Object.keys(err).forEach(function (value) {
        result[value] = err[value];
    });
    res.status((true
        && err instanceof HttpError_1.default
        && Number.isInteger(err.status)
        && err.status >= 400
        && err.status <= 599) ? err.status : 500);
    return result;
};
exports.default = middlewareErrors;
