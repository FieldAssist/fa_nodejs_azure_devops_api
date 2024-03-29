"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEpics = exports.genSprintNotes = exports.getWorkItem = exports.getWorkItems = exports.getWorkItemApi = void 0;
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
                case 0: return [4 /*yield*/, workItemTrackingApi.getWorkItems(__spreadArray([], ids, true), undefined, undefined, WorkItemTrackingInterfaces_1.WorkItemExpand.All)];
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
function genSprintNotes(orgUrl, token, iterationPaths, sprintName) {
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
                    query = "SELECT [System.Id], [System.Title], [System.State], [System.Description] FROM WorkItems WHERE [System.WorkItemType] = 'Product Backlog Item' AND [State] IN ('Committed','Testing','Ready for Demo','UAT','Done') AND [System.IterationPath] IN ('".concat(iterationPaths.join("','"), "') ORDER BY [Microsoft.VSTS.Common.Priority] asc, [System.CreatedDate] desc");
                    return [4 /*yield*/, workItemTrackingApi.queryByWiql({ query: query })];
                case 2:
                    backlogRefList = _c.sent();
                    backlogIds = (_b = (_a = backlogRefList === null || backlogRefList === void 0 ? void 0 : backlogRefList.workItems) === null || _a === void 0 ? void 0 : _a.map(function (value) { return value.id; })) !== null && _b !== void 0 ? _b : [];
                    return [4 /*yield*/, getWorkItems(workItemTrackingApi, backlogIds)];
                case 3:
                    backlogs = _c.sent();
                    // @ts-ignore
                    backlogs = backlogs.sort(function (a, b) { var _a, _b; return ((_a = a.fields['System.Parent']) !== null && _a !== void 0 ? _a : 0) - ((_b = b.fields['System.Parent']) !== null && _b !== void 0 ? _b : 0); });
                    contentList = [];
                    contentList.push("# \uD83D\uDD05 ".concat(sprintName !== null && sprintName !== void 0 ? sprintName : 'Sprint 000', " (xy Apr - pq Apr '21)"));
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
                    contentList.push("## \uD83D\uDCDD ".concat(title, " ").concat(id));
                    linkList = [];
                    if (id)
                        linkList.push("#### Backlog: [".concat(id, "](").concat(url, ")  "));
                    if (epicTitle)
                        linkList.push("#### Epic: [".concat(epicTitle, " ").concat(epicId, "](").concat(epicUrl, ")"));
                    if (featureTitle)
                        linkList.push("#### Feature: [".concat(featureTitle, " ").concat(featureId, "](").concat(featureUrl, ")"));
                    if (linkList.length > 0)
                        contentList.push(linkList.join('\n'));
                    if (description) {
                        contentList.push("#### Description");
                        contentList.push("".concat(description));
                    }
                    if (acceptance) {
                        contentList.push("#### Acceptance Criteria");
                        contentList.push("".concat(acceptance));
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
exports.genSprintNotes = genSprintNotes;
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
                    query = "Select [System.Id], [System.Title], [System.State], [System.Description] From WorkItems Where [System.WorkItemType] = 'Epic' AND [System.TeamProject] = 'Field_Assist' AND [State] NOT IN ('Removed') order by [Microsoft.VSTS.Common.Priority] asc, [System.CreatedDate] desc";
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