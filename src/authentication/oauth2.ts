import { Bundle, ZObject } from "zapier-platform-core";
import { InputFields } from "../fields";

export namespace OAuth2Authentication {
  export interface Definition {
    type: "oauth2";
    fields: InputFields;
    oauth2Config: {
      authorizeUrl: {
        (z: ZObject, bundle: Bundle): string | Promise<string>;
      };
      getAccessToken: {
        (z: ZObject, bundle: Bundle):
          | {
              access_token: string;
              refresh_token?: string;
              [key: string]: any;
            }
          | Promise<{
              access_token: string;
              refresh_token?: string;
              [key: string]: any;
            }>;
      };
      refreshAccessToken: {
        (z: ZObject, bundle: Bundle):
          | {
              access_token: string;
              refresh_token?: string;
              [key: string]: any;
            }
          | Promise<{
              access_token: string;
              refresh_token?: string;
              [key: string]: any;
            }>;
      };
      autoRefresh: boolean;
      scope: string;
    };
    test: {
      (z: ZObject, bundle: Bundle): object | Promise<object>;
    };
    connectionLabel: string;
  }
}
