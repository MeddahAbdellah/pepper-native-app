import {PepperImages} from "../pepperImage/pepperImage";

export enum PepperFormType {
  QuestionsForm = 'QuestionsForm',
  AddableForm = 'AddableForm',
}

export enum PepperInputType {
  GenderChoice = 'gender_choice',
  EventDate = 'eventData',
  RegularField = 'stringField',
  MultiLineField = 'textFiled',

}

/**
 * Unique key to distinguish between the result of different inputs
 * */
export interface IField {
  id: string,
  type: PepperInputType,
  placeHolder?: string,
  linesNumber?: number,
}

export interface IPageAddableForm{
  prefix:string,
  typeForm: PepperFormType.AddableForm,
  bottomImage: PepperImages,
  productCategory: string,
  
}

export interface IPageQuestionForm{
  prefix: string,
  typeForm: PepperFormType.QuestionsForm,
  questions: IField[],
  topImage?: PepperImages,
  
}

export interface IProduct {
  name: string,
  price: number
}

export interface IFormOutput {
  [key : string]: IProduct[] | { [key : string]: string|Date|number }
}