import {
  ZObject,
  Bundle,
  HttpRequestOptions,
  HttpResponse,
} from "zapier-platform-core";

import { BasicAuthentication } from "./authentication/basic";
import { CustomAuthentication } from "./authentication/custom";
import { SessionAuthentication } from "./authentication/session";
import { OAuth2Authentication } from "./authentication/oauth2";

import { HookTrigger } from "./triggers/hook";
import { PollingTrigger } from "./triggers/polling";
import { CreateAction } from "./actions/create";
import { SearchAction } from "./actions/search";
import { SearchOrCreateAction } from "./actions/search_or_create";

export namespace App {
  export interface Definition {
    /**
     * A version identifier for your code.
     */
    version: string;
    /**
     * A version identifier for the Zapier execution environment.
     */
    platformVersion: string;
    /**
     * Choose what scheme your API uses for authentication.
     */
    authentication?:
      | BasicAuthentication.Definition
      | CustomAuthentication.Definition
      | SessionAuthentication.Definition
      | OAuth2Authentication.Definition;
    /**
     * All the creates for your app. You can add your own here, or Zapier will automatically register any from the create method on your resources.
     */
    creates?: {
      [key: string]: CreateAction.Definition;
    };
    /**
     * All the searches for your app. You can add your own here, or Zapier will automatically register any from the search method on your resources.
     */
    searches?: {
      [key: string]: SearchAction.Definition;
    };
    /**
     * All the triggers for your app. You can add your own here, or Zapier will automatically register any from the list/hook methods on your resources.
     */
    triggers?: {
      [key: string]: PollingTrigger.Definition | HookTrigger.Definition;
    };
    /**
     * All the search-or-create combos for your app. You can create your own here, or Zapier will automatically register any from resources that define a search, a create, and a get (or define a searchOrCreate directly). Register non-resource search-or-creates here as well.
     */
    searchOrCreates?: {
      [key: string]: SearchOrCreateAction.Definition;
    };
    /**
     * An optional bank of named functions that you can use in `z.hydrate('someName')` to lazily load data.
     */
    hydrators?: {
      [key: string]: {
        (z: ZObject, bundle: Bundle): any;
      };
    };
    /**
     * Before an HTTP request is sent via our `z.request()` client, you can modify it.
     */
    beforeRequest?: {
      (
        request: HttpRequestOptions,
        z: ZObject,
        bundle: Bundle
      ): HttpRequestOptions;
    }[];
    /**
     * After an HTTP response is recieved via our `z.request()` client, you can modify it.
     */
    afterResponse?: {
      (response: HttpResponse, z: ZObject, bundle: Bundle): HttpResponse;
    }[];
    /**
     * Define a request mixin, great for setting custom headers, content-types, etc.
     */
    requestTemplate?: {
      /**
       * The HTTP method for the request.
       */
      method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
      /**
       * A URL for the request (we will parse the querystring and merge with params). Keys and values will not be re-encoded.
       */
      url?: string;
      /**
       * Can be nothing, a raw string or JSON (object or array).
       */
      body?: any;
      /**
       * A mapping of the querystring - will get merged with any query params in the URL. Keys and values will be encoded.
       */
      params?: {
        [key: string]: any;
      };
      /**
       * The HTTP headers for the request.
       */
      headers?: {
        [key: string]: any;
      };
      /**
       * An object holding the auth parameters for OAuth1 request signing, like `{oauth_token: 'abcd', oauth_token_secret: '1234'}`. Or an array reserved (i.e. not implemented yet) to hold the username and password for Basic Auth. Like `['AzureDiamond', 'hunter2']`.
       */
      auth?: any;
      /**
       * Should missing values be sent? (empty strings, `null`, and `undefined` only — `[]`, `{}`, and `false` will still be sent). Allowed fields are `params` and `body`. The default is `false`, ex: `removeMissingValuesFrom: { params: false, body: false }`
       */
      removeMissingValuesFrom?: {
        [key: string]: any;
      };
    };
    /**
     * EXPERIMENTAL: Before the perform method is called on your app, you can modify the execution context.
     */
    beforeApp?: Function | Function[];
    /**
     * EXPERIMENTAL: After the perform method is called on your app, you can modify the response.
     */
    afterApp?: Function | Function[];
    /**
     * Top-level app options
     */
    flags?: {
      /**
       * By default, Zapier patches the core `http` module so that all requests (including those from 3rd-party SDKs) can be logged. Set this to true if you’re seeing issues using an SDK (such as AWS).
       */
      skipHttpPatch?: boolean;
    };
  }
}
