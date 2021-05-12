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
  limit?: number | boolean;
  context?: Context;
  order?: number;
  count?: boolean;
};

export type ModelSearchPayload = Model & Database & Token & ModelSearchOpts;

export type ModelReadOpts = {
  ids: Array<number>;
  fields?: string[];
};

export type ModelWriteOpts = {
  ids: Array<number>;
  values: any;
};

export type ModelCreateOpts = {
  values: any;
};

export type ModelDeleteOpts = {
  ids: Array<number>;
};

export type ModelReadPayload = Model & Database & Token & ModelReadOpts;

export type ModelWritePayload = Model & Database & Token & ModelWriteOpts;

export type ModelCreatePayload = Model & Database & Token & ModelCreateOpts;

export type ModelDeletePayload = Model & Database & Token & ModelDeleteOpts;

export type ModelFieldsViewGetOpts = {
  type: string;
  id: number | null;
  context?: Context;
  toolbar: boolean;
};

export type ModelFieldsViewGetPayload = Model &
  Database &
  Token &
  ModelFieldsViewGetOpts;

export type ModelExecuteOpts = {
  payload?: any;
  action: string;
};

export type ModelExecutePayload = Model & Database & Token & ModelExecuteOpts;