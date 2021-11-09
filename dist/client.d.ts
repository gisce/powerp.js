import { AxiosInstance } from "axios";
import {
  UserAuth,
  FetchOpts,
  EvalDomainOpts,
  GetShortcutsOpts,
  IsShortcutFavoriteOpts,
} from "./types";
export declare class Client {
  host: string;
  database?: string;
  token?: string;
  axiosInstance: AxiosInstance;
  clientHeader?: string;
  constructor(host?: string);
  setDatabase(database: string): void;
  setToken(token: string): void;
  setAxiosInstance(axiosInstance: AxiosInstance): void;
  _fetch(options: FetchOpts): Promise<any>;
  loginAndGetToken(options: UserAuth): Promise<string>;
  getDatabases(): Promise<string[]>;
  getServerVersion(): Promise<string>;
  getLoginMessage(): Promise<string>;
  refreshToken(token: string): Promise<string>;
  setClientHeader(clientHeader: string): void;
  evalDomain(options: EvalDomainOpts): Promise<any>;
  getShortcuts(options: GetShortcutsOpts): Promise<any>;
  isShortcutFavorite(options: IsShortcutFavoriteOpts): Promise<any>;
}
