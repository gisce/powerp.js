import axios from "axios";
import { LoginAndGetTokenOpts, FetchOpts } from "./types";
import { createLoginTokenPayload } from "./payloads";

export abstract class Client {
  public static async loginAndGetToken(options: LoginAndGetTokenOpts) {
    const { host, database, user, password } = options;

    const payload = createLoginTokenPayload({
      database,
      user,
      password,
    });
    const token = await this._fetch({
      host,
      payload,
      service: "common",
    });
    if (!token) {
      throw "Invalid User/Login";
    }
    return token;
  }

  public static async _fetch(options: FetchOpts) {
    const { service = "object" } = options;

    if (service != "common" && !options.token) {
      throw "You must login first";
    }

    console.debug(`Sending ${options.payload} to ${options.host}/${service}`);

    try {
      const response = await axios.post(
        `${options.host}/${service}`,
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
        `Error in fetching ${options.host}/${service}: ${JSON.stringify(
          e,
          null,
          2
        )}`
      );
      throw e;
    }
  }
}
