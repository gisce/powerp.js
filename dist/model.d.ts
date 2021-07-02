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
export declare class Model {
  model: string;
  client: Client;
  constructor(model: string, client: Client);
  search(options: ModelSearchOpts): Promise<any>;
  read(options: ModelReadOpts): Promise<any>;
  fields_view_get(options: ModelFieldsViewGetOpts): Promise<any>;
  execute(options: ModelExecuteOpts): Promise<any>;
  write(options: ModelWriteOpts): Promise<any>;
  create(options: ModelCreateOpts): Promise<any>;
  delete(options: ModelDeleteOpts): Promise<any>;
  executeWorkflow(options: ModelExecuteOpts): Promise<any>;
  executeOnChange(options: ModelExecuteOnChangeOpts): Promise<any>;
}
