import { Client } from "./client";
import {
  ModelSearchOpts,
  ModelReadOpts,
  ModelFieldsViewGetOpts,
} from "./types";
export declare class Model {
  model: string;
  client: Client;
  constructor(model: string, client: Client);
  search(options: ModelSearchOpts): Promise<any>;
  read(options: ModelReadOpts): Promise<any>;
  fields_view_get(options: ModelFieldsViewGetOpts): Promise<any>;
}
