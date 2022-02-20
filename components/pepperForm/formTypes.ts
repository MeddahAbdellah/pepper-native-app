import { Moment } from 'moment';

export enum FormType {
  Text = 'text',
  Date = 'date',
  Gender = 'gender',
  Menu = 'menu',
  Image = 'image',
}

export enum KeyBoardType {
  Default = 'default',
  Numeric = 'decimal-pad',
  Phone = 'phone-pad',
}

export interface TextInputSchema {
  type: FormType.Text,
  label: string,
  keyboardType?: KeyBoardType,
  initialValue?: string,
  max: number,
  multiline?: boolean,
  validator: (value: string) => string,
}

export interface DateInputSchema {
  type: FormType.Date,
  initialValue?: Moment,
  label: string,
  validator: (value: Moment) => string,
}

export interface GenderInputSchema {
  type: FormType.Gender
}

export interface ImageInputSchema {
  type: FormType.Image
}

export interface MenuItem {
  name: string,
  price: string,
}

export interface ImageItem {
  uri: string,
}

export interface MenuInputSchema {
  type: FormType.Menu,
  label: string,
  nameValidator: (name: string) => string,
  priceValidator: (price: string) => string,
}

export interface FormSchema {
  [key: string]: TextInputSchema | DateInputSchema | GenderInputSchema | MenuInputSchema | ImageInputSchema,
}
