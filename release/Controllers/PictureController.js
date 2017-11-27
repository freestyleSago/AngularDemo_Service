"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var PictureDataAccess_1 = require("../DataAccess/PictureDataAccess");
var PictureController = /** @class */ (function () {
    function PictureController(httpContext) {
        this.HttpContext = httpContext;
        this.dataAccess = new PictureDataAccess_1.PictureDataAccessAsync();
    }
    PictureController.prototype.GetPicturesAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.dataAccess.GetPicturesAsync()];
            });
        });
    };
    PictureController.prototype.GetPictureAsync = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.dataAccess.GetPictureAsync(id)];
            });
        });
    };
    PictureController.prototype.UpdatePictureByIDAsync = function (picture) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.dataAccess.UpdatePictureByIDAsync(picture)];
            });
        });
    };
    PictureController.prototype.AddPictureAsync = function (picture) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.dataAccess.AddPictureAsync(picture)];
            });
        });
    };
    PictureController.prototype.RemovePictureAsync = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.dataAccess.RemovePictureAsync(id)];
            });
        });
    };
    PictureController.prototype.SavePictureToLocalAsync = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var fs = require("fs");
                        var path = process.cwd() + "/images/" + file.name;
                        var dirPath = process.cwd() + "/images";
                        console.log(path);
                        // 这种回调方式真的是操蛋，又没有GoTo语法。又不想在封装一个函数。导致fs.rename只能写两次了。
                        fs.exists(dirPath, function (exists) {
                            if (!exists) {
                                fs.mkdir(dirPath, function (err) {
                                    if (err) {
                                        console.log(err.message);
                                        throw err;
                                    }
                                    fs.rename(file.path, path, function (err) { return __awaiter(_this, void 0, void 0, function () {
                                        var picture, returnValue;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    if (err) {
                                                        reject();
                                                        console.log(err.message);
                                                        return [2 /*return*/];
                                                    }
                                                    picture = { name: file.name, description: "默认描述", path: path, favorite: 0 };
                                                    return [4 /*yield*/, this.AddPictureAsync(picture)];
                                                case 1:
                                                    returnValue = _a.sent();
                                                    console.log("返回啦");
                                                    resolve(returnValue);
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); });
                                });
                            }
                            else {
                                fs.rename(file.path, path, function (err) { return __awaiter(_this, void 0, void 0, function () {
                                    var picture, returnValue;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                if (err) {
                                                    reject();
                                                    console.log(err.message);
                                                    return [2 /*return*/];
                                                }
                                                picture = { name: file.name, description: "默认描述", path: path, favorite: 0 };
                                                return [4 /*yield*/, this.AddPictureAsync(picture)];
                                            case 1:
                                                returnValue = _a.sent();
                                                console.log("返回啦");
                                                resolve(returnValue);
                                                return [2 /*return*/];
                                        }
                                    });
                                }); });
                            }
                        });
                    })];
            });
        });
    };
    PictureController.prototype.GetImageAsync = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var fs, picture;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    fs = require("fs");
                                    return [4 /*yield*/, this.GetPictureAsync(id)];
                                case 1:
                                    picture = _a.sent();
                                    if (!picture) {
                                        reject();
                                        console.log("没找到图片");
                                        return [2 /*return*/];
                                    }
                                    fs.readFile(picture.path, function (err, data) {
                                        if (err) {
                                            throw err;
                                        }
                                        resolve(data);
                                    });
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    return PictureController;
}());
exports.PictureController = PictureController;
