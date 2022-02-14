import { Moment } from 'moment';

export enum FormType {
  Text = 'text',
  Date = 'date',
  Gender = 'gender',
  Menu = 'menu',
}

export interface TextInputSchema {
  type: FormType.Text,
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

export interface GenderInputSchema {
  type: FormType.Gender
}

export interface MenuItem {
  name: string,
  price: string,
}

export interface MenuInputSchema {
  type: FormType.Menu,
  label: string,
  nameValidator: (name: string) => string,
  priceValidator: (price: string) => string,
}

export interface FormSchema {
  [key: string]: TextInputSchema | DateInputSchema | GenderInputSchema | MenuInputSchema,
}
