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
    version: string;
    platformVersion: string;
    authentication?:
      | BasicAuthentication.Definition
      | CustomAuthentication.Definition
      | SessionAuthentication.Definition
      | OAuth2Authentication.Definition;
    creates?: {
      [key: string]: CreateAction.Definition;
    };
    searches?: {
      [key: string]: SearchAction.Definition;
    };
    triggers?: {
      [key: string]: PollingTrigger.Definition | HookTrigger.Definition;
    };
    searchOrCreates?: {
      [key: string]: SearchOrCreateAction.Definition;
    };
    hydrators?: {
      [key: string]: {
        (z: ZObject, bundle: Bundle): any;
      };
    };
    beforeRequest?: {
      (
        request: HttpRequestOptions,
        z: ZObject,
        bundle: Bundle
      ): HttpRequestOptions;
    }[];
    afterResponse?: {
      (response: HttpResponse, z: ZObject, bundle: Bundle): HttpResponse;
    }[];
  }
}
