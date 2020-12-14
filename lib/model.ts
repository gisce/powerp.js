import { Client } from "./client";
import { ModelConnectionOpts, ModelSearchOpts, ModelCreateOpts } from "./types";
import { createSearchPayload, createCreatePayload } from "./payloads";

export abstract class Model {
  public static async search(
    options: ModelSearchOpts,
    connection: ModelConnectionOpts
  ) {
    const { host, database, token } = connection;
    const {
      model,
      params,
      offset = 0,
      limit = false,
      context = null,
    } = options;

    const payload = createSearchPayload({
      database,
      token,
      model,
      params,
      offset,
      limit,
      context,
    });

    return await Client._fetch({
      host,
      payload,
      service: "object",
      token,
    });
  }

  public static async create(
    options: ModelCreateOpts,
    connection: ModelConnectionOpts
  ) {
    const { host, database, token } = connection;
    const { model, values } = options;

    const payload = createCreatePayload({
      database,
      token,
      model,
      values,
    });

    return await Client._fetch({
      host,
      payload,
      service: "object",
      token,
    });
  }
}
