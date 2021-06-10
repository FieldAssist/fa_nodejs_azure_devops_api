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
Object.defineProperty(exports, "__esModule", { value: true });
exports.runApp2 = exports.getEpicMarkdownBody = exports.getWorkItemDetail = void 0;
var event_1 = require("./event");
var fs = __importStar(require("fs"));
var utils_1 = require("./utils/utils");
var delayTimeInMs = 300;
function getWorkItemDetail(item) {
    var _a;
    // @ts-ignore
    var title = item.fields['System.Title'];
    // @ts-ignore
    var description = item.fields['System.Description'];
    // @ts-ignore
    var acceptance = item.fields['Microsoft.VSTS.Common.AcceptanceCriteria'];
    var id = (_a = item.id) !== null && _a !== void 0 ? _a : -1;
    var url = item._links.html.href;
    return {
        title: title,
        description: description,
        id: id,
        acceptance: acceptance,
        url: url,
    };
}
exports.getWorkItemDetail = getWorkItemDetail;
function getEpicContent(epicDetail) {
    var contentList = [];
    contentList.push("# \uD83D\uDC51 " + epicDetail.title + " " + epicDetail.id);
    contentList.push('::: toc Table of Contents\n' + '[[toc]]\n' + ':::');
    contentList.push("#### Epic: [" + epicDetail.id + "](" + epicDetail.url + ")");
    if (epicDetail.description) {
        contentList.push("#### Description");
        contentList.push("" + epicDetail.description);
    }
    if (epicDetail.acceptance) {
        contentList.push("#### Acceptance Criteria");
        contentList.push("" + epicDetail.acceptance);
    }
    return contentList.join('\n\n');
}
function getFeatureContent(id, workItemTrackingApi) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var feature, featureDetail, contentList, relations, backlogContentList, _i, relations_1, ref, backlogId, backlogContent;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    console.log("Generating Feature: " + id);
                    return [4 /*yield*/, event_1.getWorkItem(workItemTrackingApi, id)];
                case 1:
                    feature = _d.sent();
                    featureDetail = getWorkItemDetail(feature);
                    contentList = [];
                    contentList.push("## \u27A1\uFE0F " + featureDetail.title + " " + featureDetail.id);
                    contentList.push("#### Feature: [" + featureDetail.id + "](" + featureDetail.url + ")");
                    if (featureDetail.description) {
                        contentList.push("#### Description");
                        contentList.push("" + featureDetail.description);
                    }
                    if (featureDetail.acceptance) {
                        contentList.push("#### Acceptance Criteria");
                        contentList.push("" + featureDetail.acceptance);
                    }
                    relations = ((_a = feature.relations) !== null && _a !== void 0 ? _a : []).filter(function (value) { return value.rel === "System.LinkTypes.Hierarchy-Forward"; });
                    backlogContentList = [];
                    _i = 0, relations_1 = relations;
                    _d.label = 2;
                case 2:
                    if (!(_i < relations_1.length)) return [3 /*break*/, 6];
                    ref = relations_1[_i];
                    backlogId = (_c = (_b = ref.url) === null || _b === void 0 ? void 0 : _b.split('/').reverse()[0]) !== null && _c !== void 0 ? _c : "-1";
                    return [4 /*yield*/, delay(delayTimeInMs)];
                case 3:
                    _d.sent();
                    return [4 /*yield*/, getBacklogContent(parseInt(backlogId), workItemTrackingApi)];
                case 4:
                    backlogContent = _d.sent();
                    backlogContentList.push("::: backlogs Backlog \n" + backlogContent + "\n:::");
                    _d.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 2];
                case 6:
                    if (backlogContentList.length > 0) {
                        contentList.push(backlogContentList.join('\n\n'));
                    }
                    return [2 /*return*/, contentList.join('\n\n')];
            }
        });
    });
}
function getBacklogContent(id, workItemTrackingApi) {
    return __awaiter(this, void 0, void 0, function () {
        var backlog, detail, contentList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Generating Backlog: " + id);
                    return [4 /*yield*/, event_1.getWorkItem(workItemTrackingApi, id)];
                case 1:
                    backlog = _a.sent();
                    detail = getWorkItemDetail(backlog);
                    contentList = [];
                    contentList.push("### \uD83D\uDCDD " + detail.title + " " + detail.id);
                    contentList.push("#### Backlog: [" + detail.id + "](" + detail.url + ")");
                    if (detail.description) {
                        contentList.push("#### Description");
                        contentList.push("" + detail.description);
                    }
                    if (detail.acceptance) {
                        contentList.push("#### Acceptance Criteria");
                        contentList.push("" + detail.acceptance);
                    }
                    return [2 /*return*/, contentList.join('\n\n')];
            }
        });
    });
}
function getEpicMarkdownBody(epic, orgUrl, token) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var contentList, epicDetail, epicContent, relations, _i, _d, featureRef, featureId, workItemTrackingApi, featureContent, content;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    console.log("Generating Epic: " + epic.id);
                    contentList = [];
                    epicDetail = getWorkItemDetail(epic);
                    epicContent = getEpicContent(epicDetail);
                    contentList.push(epicContent);
                    relations = ((_a = epic.relations) !== null && _a !== void 0 ? _a : []).filter(function (value) { return value.rel === "System.LinkTypes.Hierarchy-Forward"; });
                    _i = 0, _d = relations !== null && relations !== void 0 ? relations : [];
                    _e.label = 1;
                case 1:
                    if (!(_i < _d.length)) return [3 /*break*/, 6];
                    featureRef = _d[_i];
                    featureId = (_c = (_b = featureRef.url) === null || _b === void 0 ? void 0 : _b.split('/').reverse()[0]) !== null && _c !== void 0 ? _c : "-1";
                    return [4 /*yield*/, delay(delayTimeInMs)];
                case 2:
                    _e.sent();
                    return [4 /*yield*/, event_1.getWorkItemApi(orgUrl, token)];
                case 3:
                    workItemTrackingApi = _e.sent();
                    return [4 /*yield*/, getFeatureContent(parseInt(featureId), workItemTrackingApi)];
                case 4:
                    featureContent = _e.sent();
                    contentList.push(featureContent);
                    _e.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6:
                    content = contentList.join("\n\n");
                    return [2 /*return*/, {
                            title: epicDetail.title,
                            content: content,
                        }];
            }
        });
    });
}
exports.getEpicMarkdownBody = getEpicMarkdownBody;
function runApp2() {
    return __awaiter(this, void 0, void 0, function () {
        var token, orgUrl, epics, _i, epics_1, epic, epicDetail, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    token = "j3x53hmkkwah4w6fyjwjsz6ytn6ensjaekbuq2ck6wrackkfnwga";
                    orgUrl = "https://dev.azure.com/flick2know";
                    return [4 /*yield*/, event_1.getEpics(orgUrl, token)];
                case 1:
                    epics = (_a.sent()).filter(function (value) { return value.id === 35325; });
                    _i = 0, epics_1 = epics;
                    _a.label = 2;
                case 2:
                    if (!(_i < epics_1.length)) return [3 /*break*/, 6];
                    epic = epics_1[_i];
                    return [4 /*yield*/, getEpicMarkdownBody(epic, orgUrl, token)];
                case 3:
                    epicDetail = _a.sent();
                    return [4 /*yield*/, fs.promises.writeFile("../fa_vuepress_product_docs/docs/src/guide/epics/" + utils_1.kebabCase(epicDetail.title) + ".md", epicDetail.content)];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 2];
                case 6: return [3 /*break*/, 8];
                case 7:
                    e_1 = _a.sent();
                    console.error(e_1);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.runApp2 = runApp2;
function delay(delayInms) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(2);
        }, delayInms);
    });
}
//# sourceMappingURL=test.js.map