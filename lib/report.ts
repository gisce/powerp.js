import { Client } from "./client";
import { CreateReportOpts, GetReportOpts } from "./types";
import { createCreateReportPayload, createGetReportPayload } from "./payloads";

export class Report {
  client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  public async create(options: CreateReportOpts): Promise<any> {
    const { id, name, contextReport, model, context = null } = options;

    const { database, token } = this.client;

    const payload = createCreateReportPayload({
      database: database!,
      token: token!,
      model,
      context,
      id,
      name,
      contextReport,
    });

    return await this.client._fetch({
      service: "report",
      payload,
    });
  }

  public async get(options: GetReportOpts): Promise<any> {
    const { id } = options;
    const { database, token } = this.client;

    const payload = createGetReportPayload({
      database: database!,
      token: token!,
      id,
    });

    return await this.client._fetch({
      service: "report",
      payload,
    });
  }
}
