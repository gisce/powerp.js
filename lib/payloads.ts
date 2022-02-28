import {
  LoginTokenPayload,
  ModelSearchPayload,
  ModelReadPayload,
  ModelWritePayload,
  ModelFieldsViewGetPayload,
  ModelExecutePayload,
  ModelCreatePayload,
  ModelDeletePayload,
  Payload,
  CreateReportPayload,
  GetReportPayload,
  ModelExecuteOnChangePayload,
  ModelReadEvalUiPayload,
  ModelNameSearchPayload,
  ModelCopyPayload,
  EvalDomainPayload,
  GetShortcutsPayload,
  IsShortcutFavoritePayload,
  ModelPermReadPayload,
} from "./types";

export const makeLoginTokenPayload = (options: LoginTokenPayload): Payload => {
  const { database, user, password } = options;
  return ["token", database, user, password];
};

export const createSearchPayload = (options: ModelSearchPayload): Payload => {
  const {
    database,
    token,
    model,
    params,
    offset,
    limit,
    order,
    context,
    count,
  } = options;
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

export const createReadPayload = (options: ModelReadPayload): Payload => {
  const { database, token, model, ids, fields, context = {} } = options;
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

export const createPermReadPayload = (
  options: ModelPermReadPayload
): Payload => {
  const { database, token, model, ids, context = {} } = options;
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

export const createReadEvalUiPayload = (
  options: ModelReadEvalUiPayload
): Payload => {
  const { database, token, model, ids, fields, context = {}, attrs } = options;
  const payload = [
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

export const createWritePayload = (options: ModelWritePayload): Payload => {
  const { database, token, model, ids, values, context } = options;
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

export const createCreatePayload = (options: ModelCreatePayload): Payload => {
  const { database, token, model, values, context } = options;
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

export const createDeletePayload = (options: ModelDeletePayload): Payload => {
  const { database, token, model, ids } = options;
  return ["execute", database, "token", token, model, "unlink", ids];
};

export const createFieldsViewGetPayload = (
  options: ModelFieldsViewGetPayload
): Payload => {
  const {
    database,
    token,
    model,
    id,
    context,
    toolbar,
    type,
    version,
  } = options;
  const payload = [
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

  if (version) {
    payload.push(version);
  }

  return payload;
};

export const createModelExecutePayload = (
  options: ModelExecutePayload
): Payload => {
  const { database, token, model, payload, action, context } = options;
  const base = ["execute", database, "token", token, model, action];

  if (payload) {
    base.push(payload);
  }

  if (context) {
    base.push(context);
  }

  return base;
};

export const createModelNameSearchPayload = (
  options: ModelNameSearchPayload
): Payload => {
  const {
    database,
    token,
    model,
    payload,
    context,
    attrs = null,
    operator = "ilike",
    limit = 80,
  } = options;
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
    limit,
  ];
};

export const createModelExecuteWorkflowPayload = (
  options: ModelExecutePayload
): Payload => {
  const { database, token, model, payload, action } = options;
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

export const createCreateReportPayload = (
  options: CreateReportPayload
): Payload => {
  const { database, token, name, ids, context, datas } = options;
  return ["report", database, "token", token, name, ids, datas, context];
};

export const createGetReportPayload = (options: GetReportPayload): Payload => {
  const { id, database, token } = options;
  return ["report_get", database, "token", token, id];
};

export const createExecuteOnChangePayload = (
  options: ModelExecuteOnChangePayload
): Payload => {
  const { database, token, model, ids, action, payload } = options;
  const request = ["execute", database, "token", token, model, action, ids];

  Object.keys(payload).forEach((key) => {
    request.push(payload[key]);
  });

  return request;
};

export const createModelCopyPayload = (options: ModelCopyPayload): Payload => {
  const { database, token, model, id, context } = options;
  return ["execute", database, "token", token, model, "copy", id, {}, context];
};

export const createEvalDomainPayload = (
  options: EvalDomainPayload
): Payload => {
  const { database, token, domain, values, context } = options;
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

export const createGetShortcutsPayload = (
  options: GetShortcutsPayload
): Payload => {
  const { database, token, context } = options;
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

export const createIsShortcutFavoritePayload = (
  options: IsShortcutFavoritePayload
): Payload => {
  const { database, token, payload, context } = options;
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
