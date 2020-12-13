import { LoginTokenPayload, ModelSearchPayload } from "./types";

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
