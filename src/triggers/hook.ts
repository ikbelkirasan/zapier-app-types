import { ZObject, Bundle } from "zapier-platform-core";
import { InputFields, OutputFields } from "../fields";
import { Output } from "../common";

export namespace HookTrigger {
  export interface Definition {
    key: string;
    noun: string;
    display: {
      label: string;
      description: string;
      directions?: string;
      hidden?: boolean;
      important?: boolean;
    };
    operation: {
      type?: "hook";
      inputFields: InputFields;
      perform: {
        (z: ZObject, bundle: Bundle): Output[] | Promise<Output[]>;
      };
      performList: {
        (z: ZObject, bundle: Bundle): Output[] | Promise<Output[]>;
      };
      performSubscribe?: {
        (z: ZObject, bundle: Bundle):
          | {
              id: string | number;
              [key: string]: any;
            }
          | Promise<{
              id: string | number;
              [key: string]: any;
            }>;
      };
      performUnsubscribe?: {
        (z: ZObject, bundle: Bundle): object | Promise<object>;
      };
      sample: Output;
      outputFields?: OutputFields;
    };
  }
}
