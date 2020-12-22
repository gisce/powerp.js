"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReadPayload = exports.createSearchPayload = exports.makeLoginTokenPayload = void 0;
var makeLoginTokenPayload = function (options) {
    var database = options.database, user = options.user, password = options.password;
    return ["token", database, user, password];
};
exports.makeLoginTokenPayload = makeLoginTokenPayload;
var createSearchPayload = function (options) {
    var database = options.database, token = options.token, model = options.model, params = options.params, offset = options.offset, limit = options.limit;
    return [
        "execute",
        database,
        "token",
        token,
        model,
        "search",
        params,
        offset,
        limit,
    ];
};
exports.createSearchPayload = createSearchPayload;
var createReadPayload = function (options) {
    var database = options.database, token = options.token, model = options.model, ids = options.ids, fields = options.fields;
    return ["execute", database, "token", token, model, "read", ids, fields];
};
exports.createReadPayload = createReadPayload;
//# sourceMappingURL=payloads.js.map