import axios, { AxiosInstance } from "axios";
import {
  UserAuth,
  FetchOpts,
  EvalDomainOpts,
  GetShortcutsOpts,
  IsShortcutFavoriteOpts,
  AttributeConditionParserOpts,
  ButTreeOpenOpts,
  RequestOptions,
} from "./types";
import {
  createEvalDomainPayload,
  createAttributeConditionPayload,
  createGetShortcutsPayload,
  createIsShortcutFavoritePayload,
  makeLoginTokenPayload,
  createButTreeOpenPayload,
} from "./payloads";
export class Client {
  host: string;
  database?: string;
  token?: string;
  axiosInstance: AxiosInstance;
  clientHeader?: string;

  constructor(host?: string) {
    if (!host) {
      throw "A host is required";
    }

    this.host = host;
  }

  public setDatabase(database: string): void {
    this.database = database;
  }

  public setToken(token: string): void {
    this.token = token;
  }

  public getAxiosInstance(): AxiosInstance {
    if (!this.axiosInstance) {
      this.axiosInstance = axios.create();
    }
    return this.axiosInstance;
  }

  public async _fetch(data: FetchOpts): Promise<any> {
    const { service = "object", options = {} } = data;
    const { host, token } = this;

    if (service != "common" && service != "db" && !token) {
      throw "You must login first";
    }

    // console.debug(`Sending ${options.payload} to ${host}/${service}`);

    try {
      const response = await this.getAxiosInstance().post(
        `${host}/${service}`,
        data.payload,
        {
          headers: {
            "Content-Type": "application/json",
            "X-GISCE-Client": this.clientHeader,
          },
          ...options,
        }
      );
      // console.debug(`Response from API: ${JSON.stringify(response.data)}`);
      if (response.data.exception) {
        throw response.data.exception;
      }
      return response.data;
    } catch (e) {
      console.error(
        `Error in fetching ${host}/${service}: ${JSON.stringify(e, null, 2)}`
      );
      throw e;
    }
  }

  public async loginAndGetToken(options: UserAuth): Promise<string> {
    const { database } = this;
    const { user, password } = options;

    if (!database) {
      throw "You must set a database first";
    }

    const payload = makeLoginTokenPayload({
      database,
      user,
      password,
    });
    const token = await this._fetch({
      payload,
      service: "common",
    });
    if (!token) {
      throw "Invalid User/Login";
    }
    this.token = token;
    return token;
  }

  public async getDatabases(options?: RequestOptions): Promise<string[]> {
    return await this._fetch({
      service: "db",
      payload: ["list"],
      options,
    });
  }

  public async getServerVersion(options?: RequestOptions): Promise<string> {
    return await this._fetch({
      service: "db",
      payload: ["server_version"],
      options,
    });
  }

  public async getLoginMessage(options?: RequestOptions): Promise<string> {
    const loginMessage = await this._fetch({
      service: "common",
      payload: ["login_message"],
      options,
    });
    return loginMessage || "";
  }

  public async refreshToken(
    token: string,
    options?: RequestOptions
  ): Promise<string> {
    const { database } = this;

    if (!database) {
      throw "You must set a database first";
    }

    const refreshedToken = await this._fetch({
      service: "common",
      payload: ["refresh_token", token],
      options,
    });
    this.token = refreshedToken;
    return refreshedToken;
  }

  public setClientHeader(clientHeader: string): void {
    this.clientHeader = clientHeader;
  }

  public async evalDomain(
    data: EvalDomainOpts,
    options?: RequestOptions
  ): Promise<any> {
    const { values, domain, context } = data;
    const { database, token } = this;

    const executePayload = createEvalDomainPayload({
      database: database!,
      token: token!,
      domain,
      values,
      context,
    });

    return await this._fetch({
      payload: executePayload,
      options,
    });
  }

  public async parseCondition(
    data: AttributeConditionParserOpts,
    options?: RequestOptions
  ): Promise<any> {
    const { values, condition, context } = data;
    const { database, token } = this;

    const executePayload = createAttributeConditionPayload({
      database: database!,
      token: token!,
      condition,
      values,
      context,
    });

    return await this._fetch({
      payload: executePayload,
      options,
    });
  }

  public async getShortcuts(
    data: GetShortcutsOpts,
    options?: RequestOptions
  ): Promise<any> {
    const { context } = data;
    const { database, token } = this;

    const executePayload = createGetShortcutsPayload({
      database: database!,
      token: token!,
      context,
    });

    return await this._fetch({
      payload: executePayload,
      options,
    });
  }

  public async isShortcutFavorite(
    data: IsShortcutFavoriteOpts,
    options?: RequestOptions
  ): Promise<any> {
    const { context, payload } = data;
    const { database, token } = this;

    const executePayload = createIsShortcutFavoritePayload({
      database: database!,
      token: token!,
      payload,
      context,
    });

    return await this._fetch({
      payload: executePayload,
      options,
    });
  }

  public async treeButOpen(
    data: ButTreeOpenOpts,
    options?: RequestOptions
  ): Promise<any> {
    const { context, model, id } = data;
    const { database, token } = this;

    const executePayload = createButTreeOpenPayload({
      database: database!,
      token: token!,
      model,
      id,
      context,
    });

    return await this._fetch({
      payload: executePayload,
      options,
    });
  }
}
