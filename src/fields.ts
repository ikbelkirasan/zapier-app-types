import { ZObject, Bundle } from "zapier-platform-core";

export interface InputField {
  key: string;
  label?: string;
  placeholder?: string;
  default?: string;
  required?: boolean;
  helpText?: string;
  altersDynamicFields?: boolean;
  dynamic?: string;
  search?: string;
  list?: boolean;
  dict?: boolean;
  inputFormat?: string;
  computed?: string;
  children?: InputField[];
  type?:
    | "string"
    | "text"
    | "number"
    | "integer"
    | "boolean"
    | "datetime"
    | "file"
    | "password"
    | "copy";
  choices?: {
    [key: string]: string;
    [key: number]: string;
  };
}

export interface DynamicInputFieldsFunction {
  (z: ZObject, bundle: Bundle): InputField[];
}

export type InputFields = (InputField | DynamicInputFieldsFunction)[];

/// ----

export interface OutputField {
  key: string;
  label?: string;
  type?: "string" | "text" | "number" | "integer" | "boolean" | "datetime";
}

export interface DynamicOutputFieldsFunction {
  (z: ZObject, bundle: Bundle): InputField[];
}

export type OutputFields = (OutputField | DynamicOutputFieldsFunction)[];
