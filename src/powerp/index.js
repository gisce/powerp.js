import { encode, decode } from "@msgpack/msgpack";
import "whatwg-fetch";

export default class Client {
  constructor(host, database) {
    this.host = host;
    this.database = database;
    this.token = null;
  }

  async login(user, password) {
    const payload = ["token", this.database, user, password];
    const token = await this._fetch(payload, "common");
    console.log(token);
    if (!token) {
      throw "Invalid User/Login";
    }
    this.token = token;
  }

  async _fetch(payload, service = "object") {
    if (service != "common" && !this.token) {
      throw "First login!";
    }
    console.log(`Sending ${payload} to ${this.host}/${service}`);
    try {
      const response = await fetch(`${this.host}/${service}`, {
        method: "POST",
        body: encode(payload),
        headers: {
          "Content-Type": "application/msgpack"
        }
      });
      const buffer = await response.arrayBuffer();
      const result = decode(new Uint8Array(buffer));
      console.debug(`Response from API: ${result}`);
      return result;
    } catch (e) {
      console.log(`Error in decoding/fetching: ${e}`);
      throw e;
    }
  }

  model(modelname) {
    return callUndefMethods(new Model(this, modelname));
  }
}

class Model {
  constructor(client, model) {
    this.client = client;
    this.model = model;
  }

  async search(params, offset = 0, limit = false, context = null) {
    const payload = [
      "execute",
      this.client.database,
      "token",
      this.client.token,
      this.model,
      "search",
      params,
      offset,
      limit
    ];
    return this.client._fetch(payload);
  }

  async create(values) {
    const payload = [
      "execute",
      this.client.database,
      "token",
      this.client.token,
      this.model,
      "create",
      values
    ];
    return this.client._fetch(payload);
  }

  async write(ids, values) {
    const payload = [
      "execute",
      this.client.database,
      "token",
      this.client.token,
      this.model,
      "write",
      ids,
      values
    ];
    return this.client._fetch(payload);
  }

  async unlink(ids) {
    const payload = [
      "execute",
      this.client.database,
      "token",
      this.client.token,
      this.model,
      "unlink",
      ids
    ];
    return this.client._fetch(payload);
  }

  async read(ids, fields) {
    console.log("reading");
    const payload = [
      "execute",
      this.client.database,
      "token",
      this.client.token,
      this.model,
      "read",
      ids,
      fields
    ];
    return this.client._fetch(payload);
  }

  async browse(ids) {
    if (!Array.isArray(ids)) {
      console.log("browsing one ide");
      const id = Number.parseInt(ids);
      const result = await this.read(id);
      const record = new Record(callUndefMethods(this), result.id);
      record.data = result;
      return record;
    } else {
      console.log("browsing multiple ids");
      let records = [];
      const results = await this.read(ids);
      results.forEach(result => {
        const record = new Record(callUndefMethods(this), result.id);
        record.data = result;
        records.push(record);
      });
      return records;
    }
  }
}

/*
This is a hack using Proxy to call self defined methods in models. We will
try to maintain the base methods of the ERP.
 */

function callUndefMethods(obj) {
  let handler = {
    get(target, propKey, receiver) {
      if (propKey in target) {
        const orig = target[propKey];
        if (orig instanceof Function) {
          return (...args) => {
            let result = orig.apply(target, args);
            return result;
          };
        } else {
          return orig;
        }
      } else {
        return (...args) => {
          const payload = [
            "execute",
            target.client.database,
            "token",
            target.client.token,
            target.model,
            propKey,
            ...args
          ];

          const method = target.client._fetch;
          let result = method.apply(target.client, [payload, "object"]);
          return result;
        };
      }
    }
  };
  return new Proxy(obj, handler);
}

class Record {
  constructor(model, id) {
    this.model = model;
    this.id = id;
    this.data = {};
  }

  async write(values) {
    const result = await this.model.write([this.id], values);
    return result;
  }

  async unlink() {
    const result = await this.model.unlink([this.id]);
    return result;
  }

  async read(fields) {
    const result = await this.model.read(this.id, fields);
    this.data = result;
    return result;
  }
}
