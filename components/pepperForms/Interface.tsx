import {PepperImages} from "../pepperImage/pepperImage";

export enum PepperFormType {
	ImagesForm = 'ImagesForm',
	QuestionsForm = 'QuestionsForm',
	AddableForm = 'AddableForm',
}

export enum PepperInputType {
	GenderChoice = 'gender_choice',
	EventDate = 'event_data',
	RegularField = 'string_field',
	MultiLineField = 'text_filed',

}

/**
 * Warning : In many kind of inputs the optional attributes could become required*/
export interface IField
{
	/**
	 * Unique key to distinguish between the result of different inputs
	 * */
	id:string,
	type:PepperInputType,
	placeHolder?:string,
	lines_number?:number,
}


export interface ICarouselPage
{
	/**
	 * Unique key to distinguish between the result of different forms
	 * */
	prefix:string,
	typeForm: PepperFormType,
	imageForm?: {
		image:PepperImages,
	},
	questionsForm?: {
		questions: Array<IField>,
		topImage?:PepperImages,
	},
	addableForm?: {
		bottomImage:PepperImages,
		productCategory : string,

	}
}

export interface IProduct
{
	name:string,
	price:number
}

