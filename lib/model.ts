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
  ModelReadEvalUiOpts,
  ModelNameSearchOpts,
  ModelCopyOpts,
  ModelPermReadOpts,
  ModelFieldsGetOpts,
  ModelExportDataOpts,
  RequestOptions,
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
  createReadEvalUiPayload,
  createModelNameSearchPayload,
  createModelCopyPayload,
  createPermReadPayload,
  createFieldsGetPayload,
  createExportDataPayload,
} from "./payloads";

export class Model {
  model: string;
  client: Client;

  constructor(model: string, client: Client) {
    this.model = model;
    this.client = client;
  }

  public async search(
    data: ModelSearchOpts,
    options?: RequestOptions
  ): Promise<any> {
    const {
      params = [],
      offset = 0,
      limit = false,
      order = 0,
      context = null,
      count = false,
    } = data;
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
      options,
    });
  }

  public async read(
    data: ModelReadOpts,
    options?: RequestOptions
  ): Promise<any> {
    const { ids, fields, context } = data;
    const { model } = this;
    const { database, token } = this.client;

    const payload = createReadPayload({
      database: database!,
      token: token!,
      model,
      ids,
      fields,
      context,
    });

    return await this.client._fetch({
      payload,
      options,
    });
  }

  public async read_and_eval_ui(
    data: ModelReadEvalUiOpts,
    options?: RequestOptions
  ): Promise<any> {
    const { ids, fields, context, attrs } = data;
    const { model } = this;
    const { database, token } = this.client;

    const payload = createReadEvalUiPayload({
      database: database!,
      token: token!,
      model,
      ids,
      fields,
      context,
      attrs,
    });

    return await this.client._fetch({
      payload,
      options,
    });
  }

  public async fields_view_get(
    data: ModelFieldsViewGetOpts,
    options?: RequestOptions
  ): Promise<any> {
    const { id, context, type, toolbar, version } = data;
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
      version,
    });

    return await this.client._fetch({
      payload,
      options,
    });
  }

  public async fields_get(
    data: ModelFieldsGetOpts,
    options?: RequestOptions
  ): Promise<any> {
    const { fields, context } = data;
    const { model } = this;
    const { database, token } = this.client;

    const payload = createFieldsGetPayload({
      database: database!,
      token: token!,
      model,
      fields,
      context,
    });

    return await this.client._fetch({
      payload,
      options,
    });
  }

  public async execute(
    data: ModelExecuteOpts,
    options?: RequestOptions
  ): Promise<any> {
    const { payload, action, context } = data;
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
      options,
    });
  }

  public async write(
    data: ModelWriteOpts,
    options?: RequestOptions
  ): Promise<any> {
    const { ids, values, context } = data;
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
      options,
    });
  }

  public async create(
    data: ModelCreateOpts,
    options?: RequestOptions
  ): Promise<any> {
    const { values, context } = data;
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
      options,
    });
  }

  public async delete(
    data: ModelDeleteOpts,
    options?: RequestOptions
  ): Promise<any> {
    const { ids } = data;
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
      options,
    });
  }

  public async executeWorkflow(
    data: ModelExecuteOpts,
    options?: RequestOptions
  ): Promise<any> {
    const { payload, action, context } = data;
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
      options,
    });
  }

  public async executeOnChange(
    data: ModelExecuteOnChangeOpts,
    options?: RequestOptions
  ): Promise<any> {
    const { payload, action, ids } = data;
    const { model } = this;
    const { database, token } = this.client;

    const executePayload = createExecuteOnChangePayload({
      database: database!,
      token: token!,
      model,
      payload,
      action,
      ids,
    });

    return await this.client._fetch({
      payload: executePayload,
      options,
    });
  }

  public async name_search(
    data: ModelNameSearchOpts,
    options?: RequestOptions
  ): Promise<any> {
    const { payload, context, attrs, operator, limit } = data;
    const { model } = this;
    const { database, token } = this.client;

    const executePayload = createModelNameSearchPayload({
      database: database!,
      token: token!,
      model,
      payload,
      context,
      attrs,
      operator,
      limit,
    });

    return await this.client._fetch({
      payload: executePayload,
      options,
    });
  }

  public async copy(
    data: ModelCopyOpts,
    options?: RequestOptions
  ): Promise<any> {
    const { id, context } = data;
    const { model } = this;
    const { database, token } = this.client;

    const executePayload = createModelCopyPayload({
      database: database!,
      token: token!,
      model,
      id,
      context,
    });

    return await this.client._fetch({
      payload: executePayload,
      options,
    });
  }

  public async perm_read(
    data: ModelPermReadOpts,
    options?: RequestOptions
  ): Promise<any> {
    const { ids, context } = data;
    const { model } = this;
    const { database, token } = this.client;

    const payload = createPermReadPayload({
      database: database!,
      token: token!,
      model,
      ids,
      context,
    });

    return await this.client._fetch({
      payload,
      options,
    });
  }

  public async export_data(
    data: ModelExportDataOpts,
    options?: RequestOptions
  ): Promise<any> {
    const { fields = [], context, domain = [], format, limit = null } = data;
    const { model } = this;
    const { database, token } = this.client;

    const payload = createExportDataPayload({
      database: database!,
      token: token!,
      model,
      domain,
      limit,
      fields,
      format,
      context,
    });

    return await this.client._fetch({
      payload,
      options,
    });
  }
}
