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

export type Context = Array<any> | null;

export type Payload = Array<
  | string
  | string[]
  | number
  | number[]
  | boolean
  | Array<string[]>
  | null
  | undefined
  | Context
>;

export type FetchOpts = {
  payload: Payload;
  service?: string;
};

export type ModelSearchOpts = {
  params?: Array<any>;
  offset?: number;
  limit?: boolean;
  context?: Context;
};

export type ModelSearchPayload = Model & Database & Token & ModelSearchOpts;

export type ModelReadOpts = {
  ids: Array<number>;
  fields?: string[];
};

export type ModelReadPayload = Model & Database & Token & ModelReadOpts;

export type ModelFieldsViewGetOpts = {
  type: "tree" | "form";
  id: number;
  context?: Context;
  toolbar: boolean;
};

export type ModelFieldsViewGetPayload = Model &
  Database &
  Token &
  ModelFieldsViewGetOpts;
