import {
  LoginTokenPayload,
  ModelSearchPayload,
  ModelReadPayload,
  ModelWritePayload,
  ModelFieldsViewGetPayload,
  ModelExecutePayload,
  ModelCreatePayload,
  Payload,
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
  const { database, token, model, ids, values } = options;
  return ["execute", database, "token", token, model, "write", ids, values];
};

export const createCreatePayload = (options: ModelCreatePayload): Payload => {
  const { database, token, model, values } = options;
  return ["execute", database, "token", token, model, "create", values];
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
  const { database, token, model, payload, action } = options;
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
