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
  CreateReportOpts,
  GetReportOpts,
  CreateReportPayload,
  GetReportPayload,
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
  const { database, token, model, ids, fields } = options;
  return ["execute", database, "token", token, model, "read", ids, fields];
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
  const { database, token, model, id, context, toolbar, type } = options;
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

export const createModelExecutePayload = (
  options: ModelExecutePayload
): Payload => {
  const { database, token, model, payload, action, context } = options;
  return [
    "execute",
    database,
    "token",
    token,
    model,
    action,
    payload || undefined,
    context,
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
  const { database, token, model, name, ids, context, contextReport } = options;
  return [
    "report",
    database,
    "token",
    token,
    name,
    ids,
    {
      context: contextReport,
      model,
    },
    context,
  ];
};

export const createGetReportPayload = (options: GetReportPayload): Payload => {
  const { id, database, token } = options;
  return ["report_get", database, "token", token, id];
};
