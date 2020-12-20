export type Host = {
  host: string;
};

export type Database = {
  database: string;
};

export type UserAuth = {
  user: string;
  password: string;
};

export type ClientOpts = Host & Database;

export type LoginTokenPayload = Database & UserAuth;

export type Token = {
  token: string;
};

export type FetchOpts = {
  payload: Array<
    string | number | boolean | Array<string[]> | object | null | undefined
  >;
  service?: string;
};
