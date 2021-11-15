"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIsShortcutFavoritePayload = exports.createGetShortcutsPayload = exports.createEvalDomainPayload = exports.createModelCopyPayload = exports.createExecuteOnChangePayload = exports.createGetReportPayload = exports.createCreateReportPayload = exports.createModelExecuteWorkflowPayload = exports.createModelNameSearchPayload = exports.createModelExecutePayload = exports.createFieldsViewGetPayload = exports.createDeletePayload = exports.createCreatePayload = exports.createWritePayload = exports.createReadEvalUiPayload = exports.createPermReadPayload = exports.createReadPayload = exports.createSearchPayload = exports.makeLoginTokenPayload = void 0;
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
    fields = options.fields,
    _a = options.context,
    context = _a === void 0 ? {} : _a;
  return [
    "execute",
    database,
    "token",
    token,
    model,
    "read",
    ids,
    fields,
    context,
  ];
};
exports.createReadPayload = createReadPayload;
var createPermReadPayload = function (options) {
  var database = options.database,
    token = options.token,
    model = options.model,
    ids = options.ids,
    _a = options.context,
    context = _a === void 0 ? {} : _a;
  return [
    "execute",
    database,
    "token",
    token,
    model,
    "perm_read",
    ids,
    context,
  ];
};
exports.createPermReadPayload = createPermReadPayload;
var createReadEvalUiPayload = function (options) {
  var database = options.database,
    token = options.token,
    model = options.model,
    ids = options.ids,
    fields = options.fields,
    _a = options.context,
    context = _a === void 0 ? {} : _a,
    attrs = options.attrs;
  var payload = [
    "execute",
    database,
    "token",
    token,
    model,
    "read_and_eval_ui",
    ids,
    fields,
    context,
  ];
  if (attrs) {
    payload.push(attrs);
  }
  return payload;
};
exports.createReadEvalUiPayload = createReadEvalUiPayload;
var createWritePayload = function (options) {
  var database = options.database,
    token = options.token,
    model = options.model,
    ids = options.ids,
    values = options.values,
    context = options.context;
  return [
    "execute",
    database,
    "token",
    token,
    model,
    "write",
    ids,
    values,
    context,
  ];
};
exports.createWritePayload = createWritePayload;
var createCreatePayload = function (options) {
  var database = options.database,
    token = options.token,
    model = options.model,
    values = options.values,
    context = options.context;
  return [
    "execute",
    database,
    "token",
    token,
    model,
    "create",
    values,
    context,
  ];
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
    action = options.action,
    context = options.context;
  var base = ["execute", database, "token", token, model, action];
  if (payload) {
    base.push(payload);
  }
  if (context) {
    base.push(context);
  }
  return base;
};
exports.createModelExecutePayload = createModelExecutePayload;
var createModelNameSearchPayload = function (options) {
  var database = options.database,
    token = options.token,
    model = options.model,
    payload = options.payload,
    context = options.context,
    _a = options.attrs,
    attrs = _a === void 0 ? null : _a,
    _b = options.operator,
    operator = _b === void 0 ? "ilike" : _b;
  return [
    "execute",
    database,
    "token",
    token,
    model,
    "name_search",
    payload,
    attrs,
    operator,
    context,
  ];
};
exports.createModelNameSearchPayload = createModelNameSearchPayload;
var createModelExecuteWorkflowPayload = function (options) {
  var database = options.database,
    token = options.token,
    model = options.model,
    payload = options.payload,
    action = options.action;
  return [
    "exec_workflow",
    database,
    "token",
    token,
    model,
    action,
    payload || undefined,
  ];
};
exports.createModelExecuteWorkflowPayload = createModelExecuteWorkflowPayload;
var createCreateReportPayload = function (options) {
  var database = options.database,
    token = options.token,
    name = options.name,
    ids = options.ids,
    context = options.context,
    datas = options.datas;
  return ["report", database, "token", token, name, ids, datas, context];
};
exports.createCreateReportPayload = createCreateReportPayload;
var createGetReportPayload = function (options) {
  var id = options.id,
    database = options.database,
    token = options.token;
  return ["report_get", database, "token", token, id];
};
exports.createGetReportPayload = createGetReportPayload;
var createExecuteOnChangePayload = function (options) {
  var database = options.database,
    token = options.token,
    model = options.model,
    ids = options.ids,
    action = options.action,
    payload = options.payload;
  var request = ["execute", database, "token", token, model, action, ids];
  Object.keys(payload).forEach(function (key) {
    request.push(payload[key]);
  });
  return request;
};
exports.createExecuteOnChangePayload = createExecuteOnChangePayload;
var createModelCopyPayload = function (options) {
  var database = options.database,
    token = options.token,
    model = options.model,
    id = options.id,
    context = options.context;
  return ["execute", database, "token", token, model, "copy", id, {}, context];
};
exports.createModelCopyPayload = createModelCopyPayload;
var createEvalDomainPayload = function (options) {
  var database = options.database,
    token = options.token,
    domain = options.domain,
    values = options.values,
    context = options.context;
  return [
    "execute",
    database,
    "token",
    token,
    "ir.actions.act_window",
    "eval_domain",
    domain,
    values,
    context,
  ];
};
exports.createEvalDomainPayload = createEvalDomainPayload;
var createGetShortcutsPayload = function (options) {
  var database = options.database,
    token = options.token,
    context = options.context;
  return [
    "execute",
    database,
    "token",
    token,
    "ir.ui.view_sc",
    "get_shortcuts",
    context,
  ];
};
exports.createGetShortcutsPayload = createGetShortcutsPayload;
var createIsShortcutFavoritePayload = function (options) {
  var database = options.database,
    token = options.token,
    payload = options.payload,
    context = options.context;
  return [
    "execute",
    database,
    "token",
    token,
    "ir.ui.view_sc",
    "is_favorite",
    payload,
    context,
  ];
};
exports.createIsShortcutFavoritePayload = createIsShortcutFavoritePayload;
//# sourceMappingURL=payloads.js.map
