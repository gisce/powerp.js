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

export type Context = any | null;

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
  context?: Context;
};

export type ModelReadEvalUiOpts = ModelReadOpts & {
  attrs?: any;
};

export type ModelWriteOpts = {
  ids: Array<number>;
  values: any;
  context?: Context;
};

export type ModelCreateOpts = {
  values: any;
  context?: Context;
};

export type ModelDeleteOpts = {
  ids: Array<number>;
};

export type ModelReadPayload = Model & Database & Token & ModelReadOpts;

export type ModelReadEvalUiPayload = Model &
  Database &
  Token &
  ModelReadEvalUiOpts;

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
  context?: Context;
  attrs?: any;
};

export type ModelExecuteOnChangeOpts = {
  ids: Array<number>;
  payload?: any;
  action: string;
};

export type ModelExecutePayload = Model & Database & Token & ModelExecuteOpts;

export type ModelExecuteOnChangePayload = Model &
  Database &
  Token &
  ModelExecuteOnChangeOpts;

export type CreateReportOpts = {
  name: string;
  ids: number[];
  datas: any;
  context?: Context;
};

export type GetReportOpts = {
  id: number;
};

export type CreateReportPayload = Database & Token & CreateReportOpts;

export type GetReportPayload = Database & Token & GetReportOpts;
