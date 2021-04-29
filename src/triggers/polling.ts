import { ZObject, Bundle } from "zapier-platform-core";
import { InputFields, OutputFields } from "../fields";
import { Output } from "../common";

export namespace PollingTrigger {
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
      type?: "polling";
      inputFields: InputFields;
      perform: {
        (z: ZObject, bundle: Bundle): Output[] | Promise<Output[]>;
      };
      sample: Output;
      outputFields?: OutputFields;
    };
  }
}
