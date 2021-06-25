import { Client } from "./client";
import { CreateReportOpts, GetReportOpts } from "./types";
export declare class Report {
  client: Client;
  constructor(client: Client);
  create(options: CreateReportOpts): Promise<any>;
  get(options: GetReportOpts): Promise<any>;
}
