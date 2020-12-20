import { LoginTokenPayload } from "./types";

export const makeLoginTokenPayload = (options: LoginTokenPayload) => {
  const { database, user, password } = options;
  return ["token", database, user, password];
};
