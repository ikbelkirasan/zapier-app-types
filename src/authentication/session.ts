import { Bundle, ZObject } from "zapier-platform-core";
import { InputFields } from "../fields";

export namespace SessionAuthentication {
  export interface Definition {
    type: "session";
    fields: InputFields;
    sessionConfig: {
      perform: {
        (z: ZObject, bundle: Bundle): object | Promise<object>;
      };
    };
    test: {
      (z: ZObject, bundle: Bundle): object | Promise<object>;
    };
    connectionLabel: string;
  }
}
