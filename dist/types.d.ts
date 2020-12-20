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
export declare type LoginAndGetTokenOpts = Host & Database & UserAuth;
export declare type FetchOpts = Host & {
    payload: Array<string | number | boolean | string[]>;
    service: string;
    token?: string;
};
export declare type ModelConnectionOpts = Host & Database & Token;
export declare type Model = {
    model: string;
};
export declare type ModelSearchOpts = Model & {
    params: Array<string>;
    offset: number;
    limit: boolean;
    context: null | string;
};
export declare type ModelSearchPayload = Database & Token & Model & ModelSearchOpts;
