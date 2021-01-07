import {
  LoginTokenPayload,
  ModelSearchPayload,
  ModelReadPayload,
  ModelFieldsViewGetPayload,
  Payload,
} from "./types";

export const makeLoginTokenPayload = (options: LoginTokenPayload): Payload => {
  const { database, user, password } = options;
  return ["token", database, user, password];
};

export const createSearchPayload = (options: ModelSearchPayload): Payload => {
  const { database, token, model, params, offset, limit } = options;
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

export const createReadPayload = (options: ModelReadPayload): Payload => {
  const { database, token, model, ids, fields } = options;
  return ["execute", database, "token", token, model, "read", ids, fields];
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
