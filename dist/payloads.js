"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createModelExecutePayload = exports.createFieldsViewGetPayload = exports.createReadPayload = exports.createSearchPayload = exports.makeLoginTokenPayload = void 0;
var makeLoginTokenPayload = function (options) {
  var database = options.database,
    user = options.user,
    password = options.password;
  return ["token", database, user, password];
};
exports.makeLoginTokenPayload = makeLoginTokenPayload;
var createSearchPayload = function (options) {
  var database = options.database,
    token = options.token,
    model = options.model,
    params = options.params,
    offset = options.offset,
    limit = options.limit,
    order = options.order,
    context = options.context,
    count = options.count;
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
    order,
    context,
    count,
  ];
};
exports.createSearchPayload = createSearchPayload;
var createReadPayload = function (options) {
  var database = options.database,
    token = options.token,
    model = options.model,
    ids = options.ids,
    fields = options.fields;
  return ["execute", database, "token", token, model, "read", ids, fields];
};
exports.createReadPayload = createReadPayload;
var createFieldsViewGetPayload = function (options) {
  var database = options.database,
    token = options.token,
    model = options.model,
    id = options.id,
    context = options.context,
    toolbar = options.toolbar,
    type = options.type;
  return [
    "execute",
    database,
    "token",
    token,
    model,
    "fields_view_get",
    id,
    type,
    context,
    toolbar,
  ];
};
exports.createFieldsViewGetPayload = createFieldsViewGetPayload;
var createModelExecutePayload = function (options) {
  var database = options.database,
    token = options.token,
    model = options.model,
    id = options.id,
    action = options.action;
  return [
    "execute",
    database,
    "token",
    token,
    model,
    action,
    id ? [id] : undefined,
  ];
};
exports.createModelExecutePayload = createModelExecutePayload;
//# sourceMappingURL=payloads.js.map
