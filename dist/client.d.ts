import { LoginAndGetTokenOpts, FetchOpts } from "./types";
export declare abstract class Client {
    static loginAndGetToken(options: LoginAndGetTokenOpts): Promise<any>;
    static _fetch(options: FetchOpts): Promise<any>;
}
