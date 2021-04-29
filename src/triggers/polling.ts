import { ZObject, Bundle } from "zapier-platform-core";
import { InputFields, OutputFields } from "../fields";
import { Output } from "../common";

export namespace PollingTrigger {
  export interface Definition {
    /**
     * A key to uniquely identify this trigger.
     */
    key: string;
    /**
     * A noun for this trigger that completes the sentence "triggers on a new XXX".
     */
    noun: string;
    /**
     * Define how this list/trigger method will be exposed in the UI.
     */
    display: {
      /**
       * A short label like "New Record".
       */
      label: string;
      /**
       * A description of what this trigger does.
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
     * Define how this list/trigger method will work.
     */
    operation: {
      type?: "polling";
      /**
       * Does this endpoint support a page offset?
       */
      canPaginate?: boolean;
      /**
       * What should the form a user sees and configures look like?
       */
      inputFields: InputFields;
      /**
       * How will Zapier get the data?
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
