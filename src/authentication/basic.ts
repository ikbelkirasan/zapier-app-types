import { Bundle, ZObject } from "zapier-platform-core";
import { InputFields } from "../fields";

export namespace BasicAuthentication {
  export interface Definition {
    type: "basic";
    fields: InputFields;
    test: {
      (z: ZObject, bundle: Bundle): object | Promise<object>;
    };
    connectionLabel: string;
  }
}
