"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalError = void 0;
var globalError = function (err, req, res, next) {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
};
exports.globalError = globalError;
//# sourceMappingURL=error.controller.js.map