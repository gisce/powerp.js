import { Client } from "./client";
import { CreateReportOpts, GetReportOpts, RequestOptions } from "./types";
import { createCreateReportPayload, createGetReportPayload } from "./payloads";

export class Report {
  client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  public async create(
    data: CreateReportOpts,
    options?: RequestOptions,
  ): Promise<any> {
    const { ids, name, datas, context = null } = data;

    const { database, token } = this.client;

    const payload = createCreateReportPayload({
      database: database!,
      token: token!,
      context,
      ids,
      name,
      datas,
    });

    return await this.client._fetch({
      service: "report",
      payload,
      options,
    });
  }

  public async get(
    data: GetReportOpts,
    options?: RequestOptions,
  ): Promise<any> {
    const { id } = data;
    const { database, token } = this.client;

    const payload = createGetReportPayload({
      database: database!,
      token: token!,
      id,
    });

    return await this.client._fetch({
      service: "report",
      payload,
      options,
    });
  }
}
