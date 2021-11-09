import {
  LoginTokenPayload,
  ModelSearchPayload,
  ModelReadPayload,
  ModelWritePayload,
  ModelFieldsViewGetPayload,
  ModelExecutePayload,
  ModelCreatePayload,
  ModelDeletePayload,
  Payload,
  CreateReportPayload,
  GetReportPayload,
  ModelExecuteOnChangePayload,
  ModelReadEvalUiPayload,
  ModelNameSearchPayload,
  ModelCopyPayload,
  EvalDomainPayload,
  GetShortcutsPayload,
  IsShortcutFavoritePayload,
} from "./types";
export declare const makeLoginTokenPayload: (
  options: LoginTokenPayload
) => Payload;
export declare const createSearchPayload: (
  options: ModelSearchPayload
) => Payload;
export declare const createReadPayload: (options: ModelReadPayload) => Payload;
export declare const createReadEvalUiPayload: (
  options: ModelReadEvalUiPayload
) => Payload;
export declare const createWritePayload: (
  options: ModelWritePayload
) => Payload;
export declare const createCreatePayload: (
  options: ModelCreatePayload
) => Payload;
export declare const createDeletePayload: (
  options: ModelDeletePayload
) => Payload;
export declare const createFieldsViewGetPayload: (
  options: ModelFieldsViewGetPayload
) => Payload;
export declare const createModelExecutePayload: (
  options: ModelExecutePayload
) => Payload;
export declare const createModelNameSearchPayload: (
  options: ModelNameSearchPayload
) => Payload;
export declare const createModelExecuteWorkflowPayload: (
  options: ModelExecutePayload
) => Payload;
export declare const createCreateReportPayload: (
  options: CreateReportPayload
) => Payload;
export declare const createGetReportPayload: (
  options: GetReportPayload
) => Payload;
export declare const createExecuteOnChangePayload: (
  options: ModelExecuteOnChangePayload
) => Payload;
export declare const createModelCopyPayload: (
  options: ModelCopyPayload
) => Payload;
export declare const createEvalDomainPayload: (
  options: EvalDomainPayload
) => Payload;
export declare const createGetShortcutsPayload: (
  options: GetShortcutsPayload
) => Payload;
export declare const createIsShortcutFavoritePayload: (
  options: IsShortcutFavoritePayload
) => Payload;
