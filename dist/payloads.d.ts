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
} from "./types";
export declare const makeLoginTokenPayload: (
  options: LoginTokenPayload
) => Payload;
export declare const createSearchPayload: (
  options: ModelSearchPayload
) => Payload;
export declare const createReadPayload: (options: ModelReadPayload) => Payload;
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
