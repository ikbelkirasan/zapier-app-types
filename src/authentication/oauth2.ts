import { Bundle, ZObject } from "zapier-platform-core";
import { InputFields } from "../fields";

export namespace OAuth2Authentication {
  export interface Definition {
    type: "oauth2";
    /**
     * Fields you can request from the user before they connect your app to Zapier.
     */
    fields: InputFields;
    /**
     * Config for OAuth2 authentication.
     */
    oauth2Config: {
      /**
       * Define where Zapier will redirect the user to authorize our app. Note: we append the redirect URL and state parameters to return value of this function.
       */
      authorizeUrl:
        | {
            (z: ZObject, bundle: Bundle): string | Promise<string>;
          }
        | {
            method?: "GET";
            url?: string;
            params?: object;
          };
      /**
       * Define how Zapier fetches an access token from the API
       */
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
      /**
       * Define how Zapier will refresh the access token from the API
       */
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
      /**
       * Should Zapier include a pre-built afterResponse middleware that invokes `refreshAccessToken` when we receive a 401 response?
       */
      autoRefresh: boolean;
      /**
       * What scope should Zapier request?
       */
      scope: string;
    };
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
