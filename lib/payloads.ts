import {
  LoginTokenPayload,
  ModelSearchPayload,
  ModelReadPayload,
} from "./types";

export const makeLoginTokenPayload = (options: LoginTokenPayload) => {
  const { database, user, password } = options;
  return ["token", database, user, password];
};

export const createSearchPayload = (options: ModelSearchPayload) => {
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

export const createReadPayload = (options: ModelReadPayload) => {
  const { database, token, model, ids, fields } = options;
  return ["execute", database, "token", token, model, "read", ids, fields];
};
