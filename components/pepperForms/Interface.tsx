import {PepperImages} from "../pepperImage/pepperImage";

export enum PepperFormType {
  ImagesForm = 'ImagesForm',
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
 * Warning : In many kind of inputs the optional attributes could become required */
export interface IField {
  /**
	 * Unique key to distinguish between the result of different inputs
	 * */
  id: string,
  type: PepperInputType,
  placeHolder?: string,
  linesNumber?: number,
}

export interface IPageAddableForm{
  prefix:string,
  typeForm: PepperFormType.AddableForm,
  addableForm: {
    bottomImage: PepperImages,
    productCategory: string,
  }
}

export interface IPageImageForm{
  prefix: string,
  typeForm: PepperFormType.ImagesForm,
  imageForm: {
    image:PepperImages,
  },
}


export interface IPageQuestionForm{
  prefix: string,
  typeForm: PepperFormType.QuestionsForm,
  questionsForm: {
    questions: IField[],
    topImage?: PepperImages,
  },
}


export interface IProduct {
  name: string,
  price: number
}

