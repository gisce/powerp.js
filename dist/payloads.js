"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSearchPayload = exports.createLoginTokenPayload = void 0;
var createLoginTokenPayload = function (options) {
    var database = options.database, user = options.user, password = options.password;
    return ["token", database, user, password];
};
exports.createLoginTokenPayload = createLoginTokenPayload;
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
//# sourceMappingURL=payloads.js.map