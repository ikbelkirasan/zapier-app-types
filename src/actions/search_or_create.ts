import { CreateAction } from "./create";
import { SearchAction } from "./search";

export namespace SearchOrCreateAction {
  export interface Definition {
    key: string;
    search: SearchAction.Definition;
    create: CreateAction.Definition;
  }
}
