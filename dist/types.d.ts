export declare type Host = {
  host: string;
};
export declare type Database = {
  database: string;
};
export declare type UserAuth = {
  user: string;
  password: string;
};
export declare type LoginTokenPayload = Database & UserAuth;
export declare type Token = {
  token: string;
};
export declare type Model = {
  model: string;
};
export declare type Context = any | null;
export declare type Payload = Array<
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
export declare type FetchOpts = {
  payload: Payload;
  service?: string;
};
export declare type ModelSearchOpts = {
  params?: Array<any>;
  offset?: number;
  limit?: number | boolean;
  context?: Context;
  order?: number;
  count?: boolean;
};
export declare type ModelSearchPayload = Model &
  Database &
  Token &
  ModelSearchOpts;
export declare type ModelReadOpts = {
  ids: Array<number>;
  fields?: string[];
  context?: Context;
};
export declare type ModelReadEvalUiOpts = ModelReadOpts & {
  attrs?: any;
};
export declare type ModelWriteOpts = {
  ids: Array<number>;
  values: any;
  context?: Context;
};
export declare type ModelCreateOpts = {
  values: any;
  context?: Context;
};
export declare type ModelDeleteOpts = {
  ids: Array<number>;
};
export declare type ModelReadPayload = Model & Database & Token & ModelReadOpts;
export declare type ModelReadEvalUiPayload = Model &
  Database &
  Token &
  ModelReadEvalUiOpts;
export declare type ModelWritePayload = Model &
  Database &
  Token &
  ModelWriteOpts;
export declare type ModelCreatePayload = Model &
  Database &
  Token &
  ModelCreateOpts;
export declare type ModelDeletePayload = Model &
  Database &
  Token &
  ModelDeleteOpts;
export declare type ModelFieldsViewGetOpts = {
  type: string;
  id: number | null;
  context?: Context;
  toolbar: boolean;
};
export declare type ModelFieldsViewGetPayload = Model &
  Database &
  Token &
  ModelFieldsViewGetOpts;
export declare type ModelExecuteOpts = {
  payload?: any;
  action: any;
  context?: Context;
};
export declare type ModelExecuteOnChangeOpts = {
  ids: Array<number>;
  payload?: any;
  action: string;
};
export declare type ModelExecutePayload = Model &
  Database &
  Token &
  ModelExecuteOpts;
export declare type ModelExecuteOnChangePayload = Model &
  Database &
  Token &
  ModelExecuteOnChangeOpts;
export declare type CreateReportOpts = {
  name: string;
  ids: number[];
  datas: any;
  context?: Context;
};
export declare type GetReportOpts = {
  id: number;
};
export declare type CreateReportPayload = Database & Token & CreateReportOpts;
export declare type GetReportPayload = Database & Token & GetReportOpts;
export declare type ModelNameSearchOpts = {
  payload?: any;
  context?: Context;
  attrs?: any;
  operator?: string;
};
export declare type ModelNameSearchPayload = Model &
  Database &
  Token &
  ModelNameSearchOpts;
export declare type ModelCopyOpts = {
  id: number;
  context?: Context;
};
export declare type ModelCopyPayload = Model & Database & Token & ModelCopyOpts;
export declare type EvalDomainOpts = {
  domain: string;
  values: any;
  context?: Context;
};
export declare type EvalDomainPayload = Database & Token & EvalDomainOpts;
