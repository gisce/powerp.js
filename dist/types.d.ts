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
export declare type Context = Array<any> | null;
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
};
export declare type ModelWriteOpts = {
  ids: Array<number>;
  fields: any;
};
export declare type ModelReadPayload = Model & Database & Token & ModelReadOpts;
export declare type ModelWritePayload = Model &
  Database &
  Token &
  ModelWriteOpts;
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
  ids?: number[];
  action: string;
};
export declare type ModelExecutePayload = Model &
  Database &
  Token &
  ModelExecuteOpts;
