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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGit = void 0;
var nodegit_1 = require("nodegit");
var fs_1 = __importDefault(require("fs"));
var utils_1 = require("./utils/utils");
/**
 * Push the content to respective place in product docs repo
 *
 * Much of the code here is taken from https://github.com/blond/nodegit-clone/blob/master/lib/clone.js
 * @param {string} ghToken The Github PAT
 * @param {string} title The title of epic
 * @param {string} content The markdown content of the epic
 * @param {string} commitMsg The commit message
 */
function handleGit(ghToken, title, content, commitMsg) {
    return __awaiter(this, void 0, void 0, function () {
        var url, localPath, defaultCallbacks, repo, mdPath, author, committer, index_1, files, oid, parent_1, commitId, remote, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 11, , 12]);
                    url = "https://github.com/FieldAssist/fa_vuepress_product_docs.git";
                    localPath = "./fa_vuepress_product_docs";
                    defaultCallbacks = {
                        certificateCheck: function () { return 1; },
                        credentials: function () {
                            // In order to authorize the clone operation, we'll need to respond to a low-level callback
                            // that expects credentials to be passed.
                            // This function will respond back with the OAuth token.
                            return nodegit_1.Cred.userpassPlaintextNew(ghToken, "x-oauth-basic");
                        }
                    };
                    return [4 /*yield*/, nodegit_1.Clone.clone(url, localPath, {
                            fetchOpts: {
                                callbacks: defaultCallbacks,
                            },
                            checkoutBranch: 'main',
                        })];
                case 1:
                    repo = _a.sent();
                    mdPath = localPath + "/docs/src/guide/epics/" + utils_1.kebabCase(title) + ".md";
                    return [4 /*yield*/, fs_1.default.promises.writeFile(mdPath, content)];
                case 2:
                    _a.sent();
                    author = nodegit_1.Signature.now("Ayush P Gupta", "ayushpguptaapg@gmail.com");
                    committer = nodegit_1.Signature.now("Ayush P Gupta", "ayushpguptaapg@gmail.com");
                    return [4 /*yield*/, repo.refreshIndex()];
                case 3:
                    index_1 = _a.sent();
                    return [4 /*yield*/, repo.getStatus()];
                case 4:
                    files = _a.sent();
                    files.forEach(function (file) { return index_1.addByPath(file.path()); });
                    //await index.addByPath(mdPath);
                    return [4 /*yield*/, index_1.write()];
                case 5:
                    //await index.addByPath(mdPath);
                    _a.sent();
                    return [4 /*yield*/, index_1.writeTree()];
                case 6:
                    oid = _a.sent();
                    return [4 /*yield*/, repo.getHeadCommit()];
                case 7:
                    parent_1 = _a.sent();
                    return [4 /*yield*/, repo.createCommit("HEAD", author, committer, commitMsg !== null && commitMsg !== void 0 ? commitMsg : 'Update from FieldAssist/fa_vuejs_azure_api_dashboard', oid, [parent_1])];
                case 8:
                    commitId = _a.sent();
                    console.log("Committed: " + commitId);
                    return [4 /*yield*/, repo.getRemote('origin')];
                case 9:
                    remote = _a.sent();
                    return [4 /*yield*/, remote.push(["refs/heads/main:refs/heads/main"], {
                            callbacks: defaultCallbacks,
                        })];
                case 10:
                    _a.sent();
                    console.log('Pushed changes successfully!');
                    repo.cleanup();
                    return [3 /*break*/, 12];
                case 11:
                    e_1 = _a.sent();
                    console.error(e_1);
                    throw e_1;
                case 12: return [2 /*return*/];
            }
        });
    });
}
exports.handleGit = handleGit;
//# sourceMappingURL=git.js.map