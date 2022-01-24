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
	/**
	 * Be wary that it should have 2 labels encoded in 	placeHolder?:string (separated by "|")
	 * results ids for reach field are id + "_1" & id + "_2" */
	DualInputFields ='dual_Field'
}

/**
 * Warning : In many kind of inputs the optional attributes could become required*/
export interface IField
{
	/**
	 * Unique key for the question to be reused for the out put
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
	type_form: PepperFormType,
	image_form?: {
		image:PepperImages,
		//onImageAdded: (image:any)=>void
	},
	questions_form?: {
		questions: Array<IField>,
		top_image?:PepperImages,
		//onFormSubmitted:(data:any)=>void
	},
	addable_form?: {
		bottom_image:PepperImages,
		product_category : string,
		//onPriceSubmitted:(data:Array<IProduct>)=>void
	}
}

export interface IProduct
{
	name:string,
	price:number
}

