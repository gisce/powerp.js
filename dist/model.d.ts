import { ModelConnectionOpts, ModelSearchOpts } from "./types";
export declare abstract class Model {
    static search(options: ModelSearchOpts, connection: ModelConnectionOpts): Promise<void>;
}
