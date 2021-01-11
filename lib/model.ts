import { Client } from "./client";
import {
  ModelSearchOpts,
  ModelReadOpts,
  ModelFieldsViewGetOpts,
  ModelExecuteOpts,
} from "./types";
import {
  createSearchPayload,
  createReadPayload,
  createFieldsViewGetPayload,
  createModelExecutePayload,
} from "./payloads";

export class Model {
  model: string;
  client: Client;

  constructor(model: string, client: Client) {
    this.model = model;
    this.client = client;
  }

  public async search(options: ModelSearchOpts): Promise<any> {
    const { params, offset = 0, limit = false, context = null } = options;
    const { model } = this;
    const { database, token } = this.client;

    const payload = createSearchPayload({
      database: database!,
      token: token!,
      model,
      params,
      offset,
      limit,
      context,
    });

    return await this.client._fetch({
      payload,
    });
  }

  public async read(options: ModelReadOpts): Promise<any> {
    const { ids, fields } = options;
    const { model } = this;
    const { database, token } = this.client;

    const payload = createReadPayload({
      database: database!,
      token: token!,
      model,
      ids,
      fields,
    });

    return await this.client._fetch({
      payload,
    });
  }

  public async fields_view_get(options: ModelFieldsViewGetOpts): Promise<any> {
    const { id, context, type, toolbar } = options;
    const { model } = this;
    const { database, token } = this.client;

    const payload = createFieldsViewGetPayload({
      database: database!,
      token: token!,
      model,
      id,
      type,
      context,
      toolbar,
    });

    return await this.client._fetch({
      payload,
    });
  }

  public async execute(options: ModelExecuteOpts): Promise<any> {
    const { id, action } = options;
    const { model } = this;
    const { database, token } = this.client;

    const payload = createModelExecutePayload({
      database: database!,
      token: token!,
      model,
      id,
      action,
    });

    return await this.client._fetch({
      payload,
    });
  }
}
