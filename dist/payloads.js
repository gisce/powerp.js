"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeLoginTokenPayload = void 0;
var makeLoginTokenPayload = function (options) {
    var database = options.database, user = options.user, password = options.password;
    return ["token", database, user, password];
};
exports.makeLoginTokenPayload = makeLoginTokenPayload;
//# sourceMappingURL=payloads.js.map