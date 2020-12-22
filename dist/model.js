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
exports.Model = void 0;
var payloads_1 = require("./payloads");
var Model = /** @class */ (function () {
    function Model(model, client) {
        this.model = model;
        this.client = client;
    }
    Model.prototype.search = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var params, _a, offset, _b, limit, _c, context, model, _d, database, token, payload;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        params = options.params, _a = options.offset, offset = _a === void 0 ? 0 : _a, _b = options.limit, limit = _b === void 0 ? false : _b, _c = options.context, context = _c === void 0 ? null : _c;
                        model = this.model;
                        _d = this.client, database = _d.database, token = _d.token;
                        payload = payloads_1.createSearchPayload({
                            database: database,
                            token: token,
                            model: model,
                            params: params,
                            offset: offset,
                            limit: limit,
                            context: context,
                        });
                        return [4 /*yield*/, this.client._fetch({
                                payload: payload,
                            })];
                    case 1: return [2 /*return*/, _e.sent()];
                }
            });
        });
    };
    Model.prototype.read = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var ids, fields, model, _a, database, token, payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        ids = options.ids, fields = options.fields;
                        model = this.model;
                        _a = this.client, database = _a.database, token = _a.token;
                        payload = payloads_1.createReadPayload({
                            database: database,
                            token: token,
                            model: model,
                            ids: ids,
                            fields: fields,
                        });
                        return [4 /*yield*/, this.client._fetch({
                                payload: payload,
                            })];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    return Model;
}());
exports.Model = Model;
//# sourceMappingURL=model.js.map