import { CreateAction } from "./create";
import { SearchAction } from "./search";

export namespace SearchOrCreateAction {
  export interface Definition {
    /**
     * A key to uniquely identify this search-or-create. Must match the search key.
     */
    key: string;
    /**
     * Configures the UI for this search-or-create.
     */
    display: string;
    /**
     * The key of the search that powers this search-or-create
     */
    search: SearchAction.Definition;
    /**
     * The key of the create that powers this search-or-create
     */
    create: CreateAction.Definition;
  }
}
