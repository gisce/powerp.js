import { LoginTokenPayload, ModelSearchPayload, ModelCreatePayload } from "./types";

export const createLoginTokenPayload = (options: LoginTokenPayload) => {
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

export const createCreatePayload = (options: ModelCreatePayload) => {
  const { database, token, model, values } = options;
  return [
    "execute",
    database,
    "token",
    token,
    model,
    "create",
    values
  ];
};
