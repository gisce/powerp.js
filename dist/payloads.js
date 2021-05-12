"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createModelExecutePayload = exports.createFieldsViewGetPayload = exports.createDeletePayload = exports.createCreatePayload = exports.createWritePayload = exports.createReadPayload = exports.createSearchPayload = exports.makeLoginTokenPayload = void 0;
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
var createWritePayload = function (options) {
  var database = options.database,
    token = options.token,
    model = options.model,
    ids = options.ids,
    values = options.values;
  return ["execute", database, "token", token, model, "write", ids, values];
};
exports.createWritePayload = createWritePayload;
var createCreatePayload = function (options) {
  var database = options.database,
    token = options.token,
    model = options.model,
    values = options.values;
  return ["execute", database, "token", token, model, "create", values];
};
exports.createCreatePayload = createCreatePayload;
var createDeletePayload = function (options) {
  var database = options.database,
    token = options.token,
    model = options.model,
    ids = options.ids;
  return ["execute", database, "token", token, model, "unlink", ids];
};
exports.createDeletePayload = createDeletePayload;
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
    payload = options.payload,
    action = options.action;
  return [
    "execute",
    database,
    "token",
    token,
    model,
    action,
    payload || undefined,
  ];
};
exports.createModelExecutePayload = createModelExecutePayload;
//# sourceMappingURL=payloads.js.map