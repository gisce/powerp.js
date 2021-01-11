import {
  LoginTokenPayload,
  ModelSearchPayload,
  ModelReadPayload,
  ModelFieldsViewGetPayload,
  ModelExecutePayload,
  Payload,
} from "./types";
export declare const makeLoginTokenPayload: (
  options: LoginTokenPayload
) => Payload;
export declare const createSearchPayload: (
  options: ModelSearchPayload
) => Payload;
export declare const createReadPayload: (options: ModelReadPayload) => Payload;
export declare const createFieldsViewGetPayload: (
  options: ModelFieldsViewGetPayload
) => Payload;
export declare const createModelExecutePayload: (
  options: ModelExecutePayload
) => Payload;
