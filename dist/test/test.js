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
exports.runEpicPublish = void 0;
var event_1 = require("../event");
var test_1 = require("../test");
var git_1 = require("../git");
function runEpicPublish(azToken, ghToken, epicId) {
    return __awaiter(this, void 0, void 0, function () {
        var orgUrl, workItemTrackingApi, epic, epicMarkdown, commitMsg, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    orgUrl = "https://dev.azure.com/flick2know";
                    if (!ghToken || !epicId || !azToken) {
                        throw 'ghToken, epicId, azToken cannot be null/empty!';
                    }
                    return [4 /*yield*/, (0, event_1.getWorkItemApi)(orgUrl, azToken)];
                case 1:
                    workItemTrackingApi = _a.sent();
                    return [4 /*yield*/, (0, event_1.getWorkItem)(workItemTrackingApi, parseInt(epicId))];
                case 2:
                    epic = _a.sent();
                    return [4 /*yield*/, (0, test_1.getEpicMarkdownBody)(epic, orgUrl, azToken)];
                case 3:
                    epicMarkdown = _a.sent();
                    console.log('Generated markdown content successfully!');
                    commitMsg = "Update from FieldAssist/fa_vuejs_azure_api_dashboard for Epic ".concat(epic.id);
                    return [4 /*yield*/, (0, git_1.handleGit)(ghToken, epicMarkdown.title, epicMarkdown.content, commitMsg)];
                case 4:
                    _a.sent();
                    return [2 /*return*/, 'Successfully pushed changes.'];
                case 5:
                    e_1 = _a.sent();
                    console.error(e_1);
                    throw e_1;
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.runEpicPublish = runEpicPublish;
//# sourceMappingURL=test.js.map