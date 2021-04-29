import { ZObject, Bundle } from "zapier-platform-core";
import { InputFields, OutputFields } from "../fields";
import { Output } from "../common";

export namespace HookTrigger {
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
     * Define how this trigger method will be exposed in the UI.
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
       * A short blurb that can explain how to get this working. EG: how and where to copy-paste a static hook URL into your application. Only evaluated for static webhooks.
       */
      directions?: string;
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
     * Define how this trigger method will work.
     */
    operation: {
      type?: "hook";
      /**
       * What should the form a user sees and configures look like?
       */
      inputFields: InputFields;
      /**
       * A function that processes the inbound webhook request.
       */
      perform: {
        (z: ZObject, bundle: Bundle): Output[] | Promise<Output[]>;
      };
      /**
       * Can get "live" data on demand instead of waiting for a hook. If you find yourself reaching for this - consider resources and their built-in hook/list methods. Note: this is required for public apps to ensure the best UX for the end-user. For private apps, you can ignore warnings about this property with the `--without-style` flag during `zapier push`.
       */
      performList: {
        (z: ZObject, bundle: Bundle): Output[] | Promise<Output[]>;
      };
      /**
       * Takes a URL and any necessary data from the user and subscribes. Note: this is required for public apps to ensure the best UX for the end-user. For private apps, you can ignore warnings about this property with the `--without-style` flag during `zapier push`.
       */
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
      /**
       * Takes a URL and data from a previous subscribe call and unsubscribes. Note: this is required for public apps to ensure the best UX for the end-user. For private apps, you can ignore warnings about this property with the `--without-style` flag during `zapier push`.
       */
      performUnsubscribe?: {
        (z: ZObject, bundle: Bundle): object | Promise<object>;
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
