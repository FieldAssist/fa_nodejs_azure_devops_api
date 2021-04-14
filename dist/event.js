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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEpics = exports.runApp = exports.getWorkItem = exports.getWorkItems = exports.getWorkItemApi = void 0;
var azdev = __importStar(require("azure-devops-node-api"));
var WorkItemTrackingInterfaces_1 = require("azure-devops-node-api/interfaces/WorkItemTrackingInterfaces");
function getWorkItemApi(orgUrl, token) {
    return __awaiter(this, void 0, void 0, function () {
        var authHandler, connection;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    authHandler = azdev.getPersonalAccessTokenHandler(token);
                    connection = new azdev.WebApi(orgUrl, authHandler);
                    return [4 /*yield*/, connection.getWorkItemTrackingApi()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getWorkItemApi = getWorkItemApi;
function getWorkItems(workItemTrackingApi, ids) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, workItemTrackingApi.getWorkItems(__spreadArray([], ids), undefined, undefined, WorkItemTrackingInterfaces_1.WorkItemExpand.All)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getWorkItems = getWorkItems;
function getWorkItem(workItemTrackingApi, id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, workItemTrackingApi.getWorkItem(id, undefined, undefined, WorkItemTrackingInterfaces_1.WorkItemExpand.All)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getWorkItem = getWorkItem;
function runApp(orgUrl, token, iterationPaths) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var workItemTrackingApi, query, backlogRefList, backlogIds, backlogs, contentList, _i, backlogs_1, backlog, title, description, acceptance, id, url, featureTitle, featureUrl, epicTitle, epicId, epicUrl, featureId, feature, epic, linkList, content, e_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 10, , 11]);
                    return [4 /*yield*/, getWorkItemApi(orgUrl, token)];
                case 1:
                    workItemTrackingApi = _c.sent();
                    query = "Select [System.Id], [System.Title], [System.State], [System.Description] From WorkItems Where [System.WorkItemType] = 'Product Backlog Item' AND [State] = 'Done' AND [System.IterationPath] in ('" + iterationPaths.join("','") + "') order by [Microsoft.VSTS.Common.Priority] asc, [System.CreatedDate] desc";
                    return [4 /*yield*/, workItemTrackingApi.queryByWiql({ query: query })];
                case 2:
                    backlogRefList = _c.sent();
                    backlogIds = (_b = (_a = backlogRefList === null || backlogRefList === void 0 ? void 0 : backlogRefList.workItems) === null || _a === void 0 ? void 0 : _a.map(function (value) { return value.id; })) !== null && _b !== void 0 ? _b : [];
                    return [4 /*yield*/, getWorkItems(workItemTrackingApi, backlogIds)];
                case 3:
                    backlogs = _c.sent();
                    contentList = [];
                    contentList.push("# 🔅 Sprint 000 (xy Apr - pqr Apr '21)");
                    _i = 0, backlogs_1 = backlogs;
                    _c.label = 4;
                case 4:
                    if (!(_i < backlogs_1.length)) return [3 /*break*/, 9];
                    backlog = backlogs_1[_i];
                    title = backlog.fields['System.Title'];
                    description = backlog.fields['System.Description'];
                    acceptance = backlog.fields['Microsoft.VSTS.Common.AcceptanceCriteria'];
                    id = backlog.id;
                    url = backlog._links.html.href;
                    featureTitle = "";
                    featureUrl = "";
                    epicTitle = "";
                    epicId = void 0;
                    epicUrl = "";
                    featureId = backlog.fields['System.Parent'];
                    if (!featureId) return [3 /*break*/, 7];
                    return [4 /*yield*/, workItemTrackingApi.getWorkItem(featureId !== null && featureId !== void 0 ? featureId : -1, undefined, undefined, WorkItemTrackingInterfaces_1.WorkItemExpand.All)];
                case 5:
                    feature = _c.sent();
                    // @ts-ignore
                    featureTitle = feature.fields['System.Title'];
                    featureUrl = feature._links.html.href;
                    // @ts-ignore
                    epicId = feature.fields['System.Parent'];
                    if (!epicId) return [3 /*break*/, 7];
                    return [4 /*yield*/, workItemTrackingApi.getWorkItem(epicId !== null && epicId !== void 0 ? epicId : -1, undefined, undefined, WorkItemTrackingInterfaces_1.WorkItemExpand.All)];
                case 6:
                    epic = _c.sent();
                    // @ts-ignore
                    epicTitle = epic.fields['System.Title'];
                    epicUrl = epic._links.html.href;
                    _c.label = 7;
                case 7:
                    contentList.push("## \uD83D\uDCDD " + title + " " + id);
                    linkList = [];
                    if (id)
                        linkList.push("#### Backlog: [" + id + "](" + url + ")  ");
                    if (epicTitle)
                        linkList.push("#### Epic: [" + epicTitle + " " + epicId + "](" + epicUrl + ")");
                    if (featureTitle)
                        linkList.push("#### Feature: [" + featureTitle + " " + featureId + "](" + featureUrl + ")");
                    if (linkList.length > 0)
                        contentList.push(linkList.join('\n'));
                    if (description) {
                        contentList.push("### Description");
                        contentList.push("" + description);
                    }
                    if (acceptance) {
                        contentList.push("### Acceptance Criteria");
                        contentList.push("" + acceptance);
                    }
                    _c.label = 8;
                case 8:
                    _i++;
                    return [3 /*break*/, 4];
                case 9:
                    content = contentList.join('\n\n');
                    console.log(content);
                    return [2 /*return*/, content];
                case 10:
                    e_1 = _c.sent();
                    console.error(e_1);
                    throw e_1;
                case 11: return [2 /*return*/];
            }
        });
    });
}
exports.runApp = runApp;
function getEpics(orgUrl, token) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var workItemTrackingApi, query, backlogRefList, backlogIds, e_2;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, getWorkItemApi(orgUrl, token)];
                case 1:
                    workItemTrackingApi = _c.sent();
                    query = "Select [System.Id], [System.Title], [System.State], [System.Description] From WorkItems Where [System.WorkItemType] = 'Epic' AND [System.TeamProject] = 'Field_Assist' order by [Microsoft.VSTS.Common.Priority] asc, [System.CreatedDate] desc";
                    return [4 /*yield*/, workItemTrackingApi.queryByWiql({ query: query })];
                case 2:
                    backlogRefList = _c.sent();
                    backlogIds = (_b = (_a = backlogRefList === null || backlogRefList === void 0 ? void 0 : backlogRefList.workItems) === null || _a === void 0 ? void 0 : _a.map(function (value) { return value.id; })) !== null && _b !== void 0 ? _b : [];
                    return [4 /*yield*/, getWorkItems(workItemTrackingApi, backlogIds)];
                case 3: 
                // @ts-ignore
                return [2 /*return*/, _c.sent()];
                case 4:
                    e_2 = _c.sent();
                    console.error(e_2);
                    throw e_2;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getEpics = getEpics;
//# sourceMappingURL=event.js.map