import { ZObject, Bundle } from "zapier-platform-core";
import { InputFields, OutputFields } from "../fields";
import { Output } from "../common";

export namespace CreateAction {
  export interface Definition {
    key: string;
    noun: string;
    display: {
      label: string;
      description: string;
      hidden?: boolean;
      important?: boolean;
    };
    operation: {
      inputFields: InputFields;
      perform: {
        (z: ZObject, bundle: Bundle):
          | Output
          | Output[]
          | Promise<Output>
          | Promise<Output[]>;
      };
      performResume?: {
        (z: ZObject, bundle: Bundle):
          | Output
          | Output[]
          | Promise<Output>
          | Promise<Output[]>;
      };
      sample: Output;
      outputFields?: OutputFields;
    };
  }
}
