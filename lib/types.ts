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

export type Model = {
  model: string;
};

export type FetchOpts = {
  payload: Array<
    string | number | boolean | Array<string[]> | object | null | undefined
  >;
  service?: string;
};

export type ModelSearchOpts = {
  params?: Array<any>;
  offset?: number;
  limit?: boolean;
  context?: string | null;
};

export type ModelSearchPayload = Model & Database & Token & ModelSearchOpts;

export type ModelReadOpts = {
  ids: Array<number>;
  fields?: string[];
};

export type ModelReadPayload = Model & Database & Token & ModelReadOpts;
