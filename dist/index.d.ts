export declare class Client {
    host: string;
    database: string;
    token: string | null;
    constructor(host: string, database: string);
    login(user: string, password: string): Promise<void>;
    _fetch(payload: Array<String>, service?: string): Promise<any>;
}
