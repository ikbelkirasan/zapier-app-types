import { ZObject, Bundle } from "zapier-platform-core";
import { InputFields, OutputFields } from "../fields";
import { Output } from "../common";

export namespace CreateAction {
  export interface Definition {
    /**
     * A key to uniquely identify this create.
     */
    key: string;
    /**
     * A noun for this create that completes the sentence "creates a new XXX".
     */
    noun: string;
    /**
     * Configures the UI for this create.
     */
    display: {
      /**
       * A short label like "Create Record in Project".
       */
      label: string;
      /**
       * A description of what this create does.
       */
      description: string;
      /**
       * Should this operation be unselectable by users?
       */
      hidden?: boolean;
      /**
       * Affects how prominently this operation is displayed in the UI. Only mark a few of the most popular operations important.
       */
      important?: boolean;
    };
    /**
     * Powers the functionality for this create.
     */
    operation: {
      /**
       * What should the form a user sees and configures look like?
       */
      inputFields: InputFields;
      /**
       * How will Zapier get the data? This can be a function like `(z) => [{id: 123}]`
       */
      perform: {
        (z: ZObject, bundle: Bundle):
          | Output
          | Output[]
          | Promise<Output>
          | Promise<Output[]>;
      };
      /**
       * A function that parses data from a perform + callback to resume this action. For use with callback semantics.
       */
      performResume?: {
        (z: ZObject, bundle: Bundle):
          | Output
          | Output[]
          | Promise<Output>
          | Promise<Output[]>;
      };
      /**
       * What does a sample of data look like? Will use resource sample if missing. Requirement waived if `display.hidden` is true or if this belongs to a resource that has a top-level sample.
       */
      sample: Output;
      /**
       * What fields of data will this return? Will use resource outputFields if missing, will also use sample if available.
       */
      outputFields?: OutputFields;
      /**
       * Should this action be performed one at a time (avoid concurrency)?
       */
      shouldLock?: boolean;
    };
  }
}
