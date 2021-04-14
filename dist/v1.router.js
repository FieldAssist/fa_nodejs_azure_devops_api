"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.v1router = void 0;
var express_1 = __importDefault(require("express"));
var generator_router_1 = require("./routes/generator.router");
var router = express_1.default.Router();
exports.v1router = router;
router.use('/generator', generator_router_1.generatorRoute);
//# sourceMappingURL=v1.router.js.map