import { LoginTokenPayload, ModelSearchPayload } from "./types";
export declare const createLoginTokenPayload: (options: LoginTokenPayload) => string[];
export declare const createSearchPayload: (options: ModelSearchPayload) => (string | number | boolean | string[])[];
