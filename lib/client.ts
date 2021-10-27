import axios, { AxiosInstance } from "axios";
import { UserAuth, FetchOpts, EvalDomainOpts } from "./types";
import { createEvalDomainPayload, makeLoginTokenPayload } from "./payloads";

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
    this.axiosInstance = axios.create();
  }

  public setDatabase(database: string): void {
    this.database = database;
  }

  public setToken(token: string): void {
    this.token = token;
  }

  public setAxiosInstance(axiosInstance: AxiosInstance): void {
    this.axiosInstance = axiosInstance;
  }

  public async _fetch(options: FetchOpts): Promise<any> {
    const { service = "object" } = options;
    const { host, token } = this;

    if (service != "common" && service != "db" && !token) {
      throw "You must login first";
    }

    console.debug(`Sending ${options.payload} to ${host}/${service}`);

    try {
      const response = await this.axiosInstance.post(
        `${host}/${service}`,
        JSON.stringify(options.payload),
        {
          headers: {
            "Content-Type": "application/json",
            "X-GISCE-Client": this.clientHeader,
          },
        }
      );
      console.debug(`Response from API: ${JSON.stringify(response.data)}`);
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

  public async getDatabases(): Promise<string[]> {
    return await this._fetch({
      service: "db",
      payload: ["list"],
    });
  }

  public async getServerVersion(): Promise<string> {
    return await this._fetch({
      service: "db",
      payload: ["server_version"],
    });
  }

  public async getLoginMessage(): Promise<string> {
    const loginMessage = await this._fetch({
      service: "common",
      payload: ["login_message"],
    });
    return loginMessage || "";
  }

  public async refreshToken(token: string): Promise<string> {
    const { database } = this;

    if (!database) {
      throw "You must set a database first";
    }

    const refreshedToken = await this._fetch({
      service: "common",
      payload: ["refresh_token", token],
    });
    this.token = refreshedToken;
    return refreshedToken;
  }

  public setClientHeader(clientHeader: string): void {
    this.clientHeader = clientHeader;
  }

  public async evalDomain(options: EvalDomainOpts): Promise<any> {
    const { values, domain, context } = options;
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
    });
  }
}
