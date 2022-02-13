import { Moment } from "moment";

export enum FormType {
  Text = 'text',
  Textarea = 'textarea',
  Date = 'date',
}

export interface TextInputSchema {
  type: FormType.Text | FormType.Textarea,
  label: string,
  max: number,
  multiline?: boolean,
  validator: (value: string) => string,
}

export interface DateInputSchema {
  type: FormType.Date,
  label: string,
  validator: (value: Moment) => string,
}

export interface FormSchema {
  [key: string]: TextInputSchema | DateInputSchema,

}
