import { Bundle, ZObject } from "zapier-platform-core";
import { InputFields } from "../fields";

export namespace BasicAuthentication {
  export interface Definition {
    type: "basic";
    /**
     * Fields you can request from the user before they connect your app to Zapier.
     */
    fields: InputFields;
    /**
     * A function or request that confirms the authentication is working.
     */
    test: {
      (z: ZObject, bundle: Bundle): object | Promise<object>;
    };
    /**
     * A string with variables, function, or request that returns the connection label for the authenticated user.
     */
    connectionLabel: string;
  }
}
