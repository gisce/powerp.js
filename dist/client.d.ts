import { UserAuth, FetchOpts } from "./types";
export declare class Client {
    host: string;
    database?: string;
    token?: string;
    constructor(host: string);
    setDatabase(database: string): void;
    _fetch(options: FetchOpts): Promise<any>;
    loginAndGetToken(options: UserAuth): Promise<any>;
    getDatabases(): Promise<any>;
    getServerVersion(): Promise<any>;
    getLoginMessage(): Promise<any>;
}
