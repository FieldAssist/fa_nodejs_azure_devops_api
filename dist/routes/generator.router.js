"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatorRoute = void 0;
var generator_controller_1 = require("../controllers/generator.controller");
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
exports.generatorRoute = router;
router.get('/epic', generator_controller_1.epic);
router.get('/sprint', generator_controller_1.sprint);
//# sourceMappingURL=generator.router.js.map