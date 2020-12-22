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
export declare type FetchOpts = {
    payload: Array<string | number | boolean | Array<string[]> | object | null | undefined>;
    service?: string;
};
export declare type ModelSearchOpts = {
    params?: Array<any>;
    offset?: number;
    limit?: boolean;
    context?: string | null;
};
export declare type ModelSearchPayload = Model & Database & Token & ModelSearchOpts;
export declare type ModelReadOpts = {
    ids: Array<number>;
    fields?: string[];
};
export declare type ModelReadPayload = Model & Database & Token & ModelReadOpts;
