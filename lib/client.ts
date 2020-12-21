import axios from "axios";
import { UserAuth, FetchOpts } from "./types";
import { makeLoginTokenPayload } from "./payloads";

export class Client {
  host: string;
  database?: string;
  token?: string;

  constructor(host?: string) {
    if (!host) {
      throw "A host is required";
    }

    this.host = host;
  }

  public setDatabase(database: string) {
    this.database = database;
  }

  public async _fetch(options: FetchOpts) {
    const { service = "object" } = options;
    const { host, token } = this;

    if (service != "common" && service != "db" && !token) {
      throw "You must login first";
    }

    console.debug(`Sending ${options.payload} to ${host}/${service}`);

    try {
      const response = await axios.post(
        `${host}/${service}`,
        JSON.stringify(options.payload),
        {
          headers: {
            "Content-Type": "application/json",
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

  public async loginAndGetToken(options: UserAuth) {
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

  public async getDatabases() {
    return await this._fetch({
      service: "db",
      payload: ["list"],
    });
  }

  public async getServerVersion() {
    return await this._fetch({
      service: "db",
      payload: ["server_version"],
    });
  }

  public async getLoginMessage() {
    const loginMessage = await this._fetch({
      service: "common",
      payload: ["login_message"],
    });
    return loginMessage || "";
  }
}
