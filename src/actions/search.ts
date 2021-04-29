import { ZObject, Bundle } from "zapier-platform-core";
import { InputFields, OutputFields } from "../fields";
import { Output } from "../common";

export namespace SearchAction {
  export interface Definition {
    /**
     * A key to uniquely identify this search.
     */
    key: string;
    /**
     * A noun for this search that completes the sentence "finds a specific XXX".
     */
    noun: string;
    /**
     * Define how this search method will be exposed in the UI.
     */
    display: {
      /**
       * A short label like "Find Record".
       */
      label: string;
      /**
       * A description of what this search does.
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
     * Define how this search method will work.
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
        (z: ZObject, bundle: Bundle): Output[] | Promise<Output[]>;
      };
      /**
       * What does a sample of data look like? Will use resource sample if missing. Requirement waived if `display.hidden` is true or if this belongs to a resource that has a top-level sample.
       */
      sample: Output;
      /**
       * What fields of data will this return? Will use resource outputFields if missing, will also use sample if available.
       */
      outputFields?: OutputFields;
    };
  }
}
