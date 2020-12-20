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
export declare type FetchOpts = {
    payload: Array<string | number | boolean | Array<string[]> | object | null | undefined>;
    service?: string;
};
