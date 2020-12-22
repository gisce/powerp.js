import { LoginTokenPayload, ModelSearchPayload, ModelReadPayload } from "./types";
export declare const makeLoginTokenPayload: (options: LoginTokenPayload) => string[];
export declare const createSearchPayload: (options: ModelSearchPayload) => (string | number | boolean | any[] | undefined)[];
export declare const createReadPayload: (options: ModelReadPayload) => (string | string[] | number[] | undefined)[];
