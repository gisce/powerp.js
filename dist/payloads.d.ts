import {
  LoginTokenPayload,
  ModelSearchPayload,
  ModelReadPayload,
  ModelFieldsViewGetPayload,
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
