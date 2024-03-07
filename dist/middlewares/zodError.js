"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ZodValidator(error, res) {
    const zodErros = error.errors.reduce((previousValue, currentValue) => `${previousValue} ${currentValue.path.join('.')} - ${currentValue.message}`, '');
    return res.status(400).json({ error: true, message: zodErros });
}
exports.default = ZodValidator;
