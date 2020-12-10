import axios from "axios";

export class Client {
  host: string;
  database: string;
  token: string | null = null;

  constructor(host: string, database: string) {
    this.host = host;
    this.database = database;
  }

  async login(user: string, password: string) {
    const payload = ["token", this.database, user, password];
    const token = await this._fetch(payload, "common");
    if (!token) {
      throw "Invalid User/Login";
    }
    this.token = token;
  }

  async _fetch(payload: Array<String>, service: string = "object") {
    if (service != "common" && !this.token) {
      throw "You must login first";
    }
    console.debug(`Sending ${payload} to ${this.host}/${service}`);

    try {
      const response = await axios.post(
        `${this.host}/${service}`,
        JSON.stringify(payload),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.debug(`Response from API: ${response.data}`);
      return response.data;
    } catch (e) {
      console.error(
        `Error in fetching ${this.host}/${service}: ${JSON.stringify(
          e,
          null,
          2
        )}`
      );
      throw e;
    }
  }
}
