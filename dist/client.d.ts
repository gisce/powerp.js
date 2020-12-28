import { AxiosInstance } from "axios";
import { UserAuth, FetchOpts } from "./types";
export declare class Client {
    host: string;
    database?: string;
    token?: string;
    axiosInstance: AxiosInstance;
    constructor(host?: string);
    setDatabase(database: string): void;
    setToken(token: string): void;
    setAxiosInstance(axiosInstance: AxiosInstance): void;
    _fetch(options: FetchOpts): Promise<any>;
    loginAndGetToken(options: UserAuth): Promise<string>;
    getDatabases(): Promise<any>;
    getServerVersion(): Promise<any>;
    getLoginMessage(): Promise<any>;
    refreshToken(token: string): Promise<any>;
}
