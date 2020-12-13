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

export type LoginTokenPayload = Database & UserAuth;

export type Token = {
  token: string;
};

export type LoginAndGetTokenOpts = Host & Database & UserAuth;

export type FetchOpts = Host & {
  payload: Array<
    string | number | boolean | Array<string[]> | null | undefined
  >;
  service: string;
  token?: string;
};

export type ModelConnectionOpts = Host & Database & Token;

export type Model = {
  model: string;
};

export type ModelSearchOpts = Model & {
  params?: Array<string[]>;
  offset?: number;
  limit?: boolean;
  context?: string | null;
};

export type ModelSearchPayload = Database & Token & Model & ModelSearchOpts;
