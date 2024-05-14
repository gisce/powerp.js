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
  | string[][]
  | null
  | undefined
  | Context
>;

export type FetchOpts = {
  payload: Payload;
  service?: string;
  options?: RequestOptions;
};

export type ModelSearchOpts = {
  params?: any[];
  offset?: number;
  limit?: number | boolean;
  context?: Context;
  order?: number | string;
  count?: boolean;
};

export type ModelSearchPayload = Model & Database & Token & ModelSearchOpts;

export type ModelReadOpts = {
  ids: number[];
  fields?: string[];
  context?: Context;
};

export type ModelReadEvalUiOpts = ModelReadOpts & {
  attrs?: any;
};

export type ModelWriteOpts = {
  ids: number[];
  values: any;
  context?: Context;
};

export type ModelCreateOpts = {
  values: any;
  context?: Context;
};

export type ModelDeleteOpts = {
  ids: number[];
  context?: Context;
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
  version?: number;
  overrideMethodName?: string;
};

export type ModelFieldsViewGetPayload = Model &
  Database &
  Token &
  ModelFieldsViewGetOpts;

export type ModelFieldsGetOpts = {
  fields: string[];
  context?: Context;
};

export type ModelFieldsGetPayload = Model &
  Database &
  Token &
  ModelFieldsGetOpts;

export type ModelExecuteOpts = {
  payload?: any;
  action: any;
  context?: Context;
};

export type ModelExecuteOnChangeOpts = {
  ids: number[];
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

export type ModelNameSearchOpts = {
  payload?: any;
  context?: Context;
  attrs?: any;
  operator?: string;
  limit?: number;
};

export type ModelNameSearchPayload = Model &
  Database &
  Token &
  ModelNameSearchOpts;

export type ModelCopyOpts = {
  id: number;
  context?: Context;
};

export type ModelCopyPayload = Model & Database & Token & ModelCopyOpts;

export type EvalDomainOpts = {
  domain: string;
  values: any;
  context?: Context;
};

export type EvalDomainPayload = Database & Token & EvalDomainOpts;

export type AttributeConditionParserOpts = {
  condition: string;
  values: any;
  context?: Context;
};

export type AttributeConditionPayload = Database &
  Token &
  AttributeConditionParserOpts;

export type GetShortcutsOpts = {
  context?: Context;
};

export type GetShortcutsPayload = Database & Token & GetShortcutsOpts;

export type IsShortcutFavoriteOpts = {
  context?: Context;
  payload: any;
};

export type IsShortcutFavoritePayload = Database &
  Token &
  IsShortcutFavoriteOpts;

export type ModelPermReadOpts = {
  ids: number[];
  context?: Context;
};

export type ModelPermReadPayload = Model & Database & Token & ModelPermReadOpts;

export type ButTreeOpenOpts = {
  model: string;
  id: number;
  context?: Context;
};

export type ButTreeOpenPayload = Database & Token & ButTreeOpenOpts;

export type ModelExportDataOpts = {
  domain?: any[];
  format: string;
  limit?: number | null;
  fields?: string[];
  context?: Context;
};

export type ModelExportDataPayload = Database &
  Token &
  Model &
  ModelExportDataOpts;

export type RequestOptions = any;

export type ReadForViewOpts = {
  domain?: any[];
  view_id: number;
  context?: Context;
  version?: number;
};

export type ReadForViewPayload = Database & Token & Model & ReadForViewOpts;
