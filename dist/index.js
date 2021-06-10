"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var event_1 = require("./event");
var fs = __importStar(require("fs"));
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var v1_router_1 = require("./v1.router");
var helmet_1 = __importDefault(require("helmet"));
var appError_1 = require("./utils/appError");
var error_controller_1 = require("./controllers/error.controller");
var app = express_1.default();
var port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
// Allow Cross-Origin requests
app.use(cors_1.default());
// Set security HTTP headers
app.use(helmet_1.default());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use('/v1', v1_router_1.v1router);
app.use('/', v1_router_1.v1router);
/**
 * @deprecated Use generator route
 */
app.get('/generate', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var org, token, iterationPaths, orgUrl, content, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                org = req.query.org;
                token = req.query.token;
                if (!org || !token || !req.query.iterationPaths) {
                    res.status(400).send('org, token, iterationPaths cannot be null/empty!');
                    return [2 /*return*/];
                }
                iterationPaths = JSON.parse(req.query.iterationPaths);
                orgUrl = "https://dev.azure.com/" + org;
                return [4 /*yield*/, event_1.genSprintNotes(orgUrl, token, iterationPaths, 'Sprint 000')];
            case 1:
                content = _a.sent();
                res.send(content);
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                console.error(e_1);
                res.status(500).send(e_1 === null || e_1 === void 0 ? void 0 : e_1.toString());
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
/**
 * @deprecated Use generator route
 */
app.get('/clear', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            fs.rmdirSync("./fa_vuepress_product_docs", { recursive: true });
            res.send('Cleared ./fa_vuepress_product_docs dir');
        }
        catch (e) {
            console.error(e);
            res.status(500).send(e === null || e === void 0 ? void 0 : e.toString());
        }
        return [2 /*return*/];
    });
}); });
// handle undefined Routes
app.use('*', function (req, res, next) {
    var err = new appError_1.AppError(404, 'Not found', 'undefined route');
    res.status(404).send(err);
});
app.use(error_controller_1.globalError);
app.listen(port, function () {
    console.log("App listening at http://localhost:" + port);
});
//# sourceMappingURL=index.js.map