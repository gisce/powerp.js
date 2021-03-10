import { Client } from "./client";
import {
  ModelSearchOpts,
  ModelReadOpts,
  ModelFieldsViewGetOpts,
  ModelExecuteOpts,
  ModelWriteOpts,
} from "./types";
import {
  createSearchPayload,
  createReadPayload,
  createFieldsViewGetPayload,
  createModelExecutePayload,
  createWritePayload,
} from "./payloads";

export class Model {
  model: string;
  client: Client;

  constructor(model: string, client: Client) {
    this.model = model;
    this.client = client;
  }

  public async search(options: ModelSearchOpts): Promise<any> {
    const {
      params = [],
      offset = 0,
      limit = false,
      order = 0,
      context = null,
      count = false,
    } = options;
    const { model } = this;
    const { database, token } = this.client;

    const payload = createSearchPayload({
      database: database!,
      token: token!,
      model,
      params,
      offset,
      limit,
      order,
      context,
      count,
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
    const { payload, action } = options;
    const { model } = this;
    const { database, token } = this.client;

    const executePayload = createModelExecutePayload({
      database: database!,
      token: token!,
      model,
      payload,
      action,
    });

    return await this.client._fetch({
      payload: executePayload,
    });
  }

  public async write(options: ModelWriteOpts): Promise<any> {
    const { ids, fields } = options;
    const { model } = this;
    const { database, token } = this.client;

    const payload = createWritePayload({
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
}
