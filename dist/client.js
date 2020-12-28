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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
var axios_1 = require("axios");
var payloads_1 = require("./payloads");
var Client = /** @class */ (function () {
    function Client(host) {
        if (!host) {
            throw "A host is required";
        }
        this.host = host;
        this.axiosInstance = axios_1.default.create();
    }
    Client.prototype.setDatabase = function (database) {
        this.database = database;
    };
    Client.prototype.setToken = function (token) {
        this.token = token;
    };
    Client.prototype.setAxiosInstance = function (axiosInstance) {
        this.axiosInstance = axiosInstance;
    };
    Client.prototype._fetch = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, service, _b, host, token, response, e_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = options.service, service = _a === void 0 ? "object" : _a;
                        _b = this, host = _b.host, token = _b.token;
                        if (service != "common" && service != "db" && !token) {
                            throw "You must login first";
                        }
                        console.debug("Sending " + options.payload + " to " + host + "/" + service);
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.axiosInstance.post(host + "/" + service, JSON.stringify(options.payload), {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            })];
                    case 2:
                        response = _c.sent();
                        console.debug("Response from API: " + JSON.stringify(response.data));
                        if (response.data.exception) {
                            throw response.data.exception;
                        }
                        return [2 /*return*/, response.data];
                    case 3:
                        e_1 = _c.sent();
                        console.error("Error in fetching " + host + "/" + service + ": " + JSON.stringify(e_1, null, 2));
                        throw e_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Client.prototype.loginAndGetToken = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var database, user, password, payload, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        database = this.database;
                        user = options.user, password = options.password;
                        if (!database) {
                            throw "You must set a database first";
                        }
                        payload = payloads_1.makeLoginTokenPayload({
                            database: database,
                            user: user,
                            password: password,
                        });
                        return [4 /*yield*/, this._fetch({
                                payload: payload,
                                service: "common",
                            })];
                    case 1:
                        token = _a.sent();
                        if (!token) {
                            throw "Invalid User/Login";
                        }
                        this.token = token;
                        return [2 /*return*/, token];
                }
            });
        });
    };
    Client.prototype.getDatabases = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._fetch({
                            service: "db",
                            payload: ["list"],
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Client.prototype.getServerVersion = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._fetch({
                            service: "db",
                            payload: ["server_version"],
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Client.prototype.getLoginMessage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loginMessage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._fetch({
                            service: "common",
                            payload: ["login_message"],
                        })];
                    case 1:
                        loginMessage = _a.sent();
                        return [2 /*return*/, loginMessage || ""];
                }
            });
        });
    };
    Client.prototype.refreshToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var database, refreshedToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        database = this.database;
                        if (!database) {
                            throw "You must set a database first";
                        }
                        return [4 /*yield*/, this._fetch({
                                service: "common",
                                payload: ["refresh_token", token],
                            })];
                    case 1:
                        refreshedToken = _a.sent();
                        this.token = refreshedToken;
                        return [2 /*return*/, refreshedToken];
                }
            });
        });
    };
    return Client;
}());
exports.Client = Client;
//# sourceMappingURL=client.js.map