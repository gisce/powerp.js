import { Client } from "./client";
import {
  ModelSearchOpts,
  ModelReadOpts,
  ModelFieldsViewGetOpts,
  ModelExecuteOpts,
  ModelWriteOpts,
  ModelCreateOpts,
  ModelDeleteOpts,
  ModelExecuteOnChangeOpts,
} from "./types";
import {
  createSearchPayload,
  createReadPayload,
  createFieldsViewGetPayload,
  createModelExecutePayload,
  createWritePayload,
  createCreatePayload,
  createDeletePayload,
  createModelExecuteWorkflowPayload,
  createExecuteOnChangePayload,
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
    const { payload, action, context } = options;
    const { model } = this;
    const { database, token } = this.client;

    const executePayload = createModelExecutePayload({
      database: database!,
      token: token!,
      model,
      payload,
      action,
      context,
    });

    return await this.client._fetch({
      payload: executePayload,
    });
  }

  public async write(options: ModelWriteOpts): Promise<any> {
    const { ids, values, context } = options;
    const { model } = this;
    const { database, token } = this.client;

    const payload = createWritePayload({
      database: database!,
      token: token!,
      model,
      ids,
      values,
      context,
    });

    return await this.client._fetch({
      payload,
    });
  }

  public async create(options: ModelCreateOpts): Promise<any> {
    const { values, context } = options;
    const { model } = this;
    const { database, token } = this.client;

    const payload = createCreatePayload({
      database: database!,
      token: token!,
      model,
      values,
      context,
    });

    return await this.client._fetch({
      payload,
    });
  }

  public async delete(options: ModelDeleteOpts): Promise<any> {
    const { ids } = options;
    const { model } = this;
    const { database, token } = this.client;

    const payload = createDeletePayload({
      database: database!,
      token: token!,
      model,
      ids,
    });

    return await this.client._fetch({
      payload,
    });
  }

  public async executeWorkflow(options: ModelExecuteOpts): Promise<any> {
    const { payload, action, context } = options;
    const { model } = this;
    const { database, token } = this.client;

    const executePayload = createModelExecuteWorkflowPayload({
      database: database!,
      token: token!,
      model,
      payload,
      action,
      context,
    });

    return await this.client._fetch({
      payload: executePayload,
    });
  }

  public async executeOnChange(
    options: ModelExecuteOnChangeOpts
  ): Promise<any> {
    const { payload, action, context, ids } = options;
    const { model } = this;
    const { database, token } = this.client;

    const executePayload = createExecuteOnChangePayload({
      database: database!,
      token: token!,
      model,
      payload,
      action,
      context,
      ids,
    });

    return await this.client._fetch({
      payload: executePayload,
    });
  }
}
