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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var event_1 = require("./event");
var git_1 = require("./git");
var test_1 = require("./test");
var express = require('express');
var bodyParser = require('body-parser');
var marked = require('marked');
var app = express();
var port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/generate', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var org, token, iterationPaths, orgUrl, content, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                org = req.query.org;
                token = req.query.token;
                iterationPaths = JSON.parse(req.query.iterationPaths);
                if (!org || !token || !iterationPaths) {
                    res.status(400).send('org, token, iterationPaths cannot be null/empty!');
                    return [2 /*return*/];
                }
                orgUrl = "https://dev.azure.com/" + org;
                return [4 /*yield*/, event_1.runApp(orgUrl, token, iterationPaths)];
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
app.get('/generator/epic', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orgUrl, azToken, ghToken, epicId, workItemTrackingApi, epic, epicMarkdown, commitMsg, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                orgUrl = "https://dev.azure.com/flick2know";
                azToken = req.query.azToken;
                ghToken = req.query.ghToken;
                epicId = req.query.epicId;
                if (!ghToken || !epicId || !azToken) {
                    res.status(400).send('ghToken, epicId, azToken cannot be null/empty!');
                    return [2 /*return*/];
                }
                return [4 /*yield*/, event_1.getWorkItemApi(orgUrl, azToken)];
            case 1:
                workItemTrackingApi = _a.sent();
                return [4 /*yield*/, event_1.getWorkItem(workItemTrackingApi, parseInt(epicId))];
            case 2:
                epic = _a.sent();
                return [4 /*yield*/, test_1.getEpicMarkdownBody(epic, orgUrl, azToken)];
            case 3:
                epicMarkdown = _a.sent();
                console.log('Generated markdown content successfully!');
                commitMsg = "Update from FieldAssist/fa_vuejs_azure_api_dashboard for Epic " + epic.id;
                return [4 /*yield*/, git_1.handleGit(ghToken, epicMarkdown.title, epicMarkdown.content, commitMsg)];
            case 4:
                _a.sent();
                res.send('Successfully pushed changes.');
                return [3 /*break*/, 6];
            case 5:
                e_2 = _a.sent();
                console.error(e_2);
                res.status(500).send(e_2 === null || e_2 === void 0 ? void 0 : e_2.toString());
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
app.listen(port, function () {
    console.log("App listening at http://localhost:" + port);
});
