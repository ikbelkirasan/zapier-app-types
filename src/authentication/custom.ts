import { Bundle, ZObject } from "zapier-platform-core";
import { InputFields } from "../fields";

export namespace CustomAuthentication {
  export interface Definition {
    type: "custom";
    fields: InputFields;
    test: {
      (z: ZObject, bundle: Bundle): object | Promise<object>;
    };
    connectionLabel: string;
  }
}
