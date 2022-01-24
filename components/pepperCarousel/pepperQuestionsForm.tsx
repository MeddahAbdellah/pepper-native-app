import {IField, PepperFormType, PepperInputType} from "./Interface";
import PepperImage, {PepperImages} from "../pepperImage/pepperImage";
import {strict as assert} from "assert";
import {ScrollView, View} from "react-native";
import styles from "./styles";
import React, {useEffect} from "react";
import {indigo, pepper, space_unit} from "../../styles/common";
import PepperRoundButton from "../pepperRoundButton/pepperRoundButton";
import PepperDateInput from "./pepperInputs/pepperDateInput";
import PepperGenderInput from "./pepperInputs/pepperGenderInput";
import PepperTextMultiLine from "./pepperInputs/pepperTextMultiLine";
import PepperDefaultInput from "./pepperInputs/pepperDefaultInput";
import PepperDualInput from "./pepperInputs/pepperDualInput";


const CarouselItemQuestionsForm = (carouselProps: { item: { prefix:string, type_form: PepperFormType, questions_form?: {
			questions: Array<IField>,
			top_image?:PepperImages,
		},

	}, nextFormTrigger:()=>void, concatResults: (data:any)=>void, }) => {

	assert(carouselProps.item.questions_form !== undefined);

	/**
	 * key would be field id and value is the value in the input */




	/**
	 * returns True if all fields okey, and display errors with false otherwise*/
	/*
	const check_and_set_errors = () =>{

		let unfulfilled_fields = []
		for (let key in results) {
			if((results[key] === undefined) || (results[key] === ""))
				unfulfilled_fields.push(key)
		}

		if (unfulfilled_fields.length === 0) {return true}
		else
		{
			let tmp :  {[key: string]: boolean} = {}
			unfulfilled_fields.forEach((i)=>{
				tmp[i] = true
			})
			setErrors({...errors,...tmp})
			return false
		}
	}
	*/


	function toDayDate():Date{
		let date1 = new Date();
		if(date1.getHours() >= 21)
		{
			date1.setDate(date1.getDate() + 1);
		}
		date1.setHours(21)
		date1.setMinutes(0)
		date1.setSeconds(0)
		return date1
	}

	const ItemsQuestions = (items: Array<IField>)=>{

		useEffect(()=>{
			console.log("LIST QUESTIUONS",items)
		},[])

		return <>
			{items.map((i)=>{
			return <AdequateInput key={i.id} {...i} />
		})}

		</>
	}



	const AdequateInput = (propsIn:IField)=>{


		return <>
			{(propsIn.type===PepperInputType.DualInputFields)?
				<PepperDualInput placeHolderIn1={propsIn.placeHolder!.split("|")[0]}  placeHolderIn2={propsIn.placeHolder!.split("|")[0]}
												 onChangeField1={(_e)=>{}} onChangeField2={(_e)=>{}}
				/>:null
			}

			{(propsIn.type===PepperInputType.RegularField)?
				<PepperDefaultInput  onChange={(_e)=>{
				}} placeholder={propsIn.placeHolder!} />:null

			}

			{(propsIn.type===PepperInputType.GenderChoice)?
				<PepperGenderInput onChange={(_e)=>{}}  />:null

			}

			{(propsIn.type===PepperInputType.MultiLineField)?
				<PepperTextMultiLine  numberOfLines={propsIn.lines_number!} placeHolder={propsIn.placeHolder!}
															onChange={(_e)=>{
															}}/>:null
			}

			{(propsIn.type === PepperInputType.EventDate) ?
				<PepperDateInput style={styles.full_line_field} initialDate={toDayDate()} onChange={(_e) => {
				}}/> : null
			}

		</>

	}

	return (
		<>
			<ScrollView style={styles.container_input} keyboardShouldPersistTaps={"always"}>

			{(carouselProps.item.questions_form.top_image !== undefined)?
				(<View
					style={{alignSelf:"flex-end",height:18*space_unit,backgroundColor:"#fff", width:"50%"}}>
					<PepperImage src={carouselProps.item.questions_form.top_image} style={styles.bottom_image}/>
				</View>) :null}
			{(carouselProps.item.questions_form.top_image === undefined)?
				(<View
					style={{alignSelf:"flex-end",height:8*space_unit,backgroundColor:"#fff"}}>
				</View>) :null}


				{ItemsQuestions(carouselProps.item.questions_form.questions)}


				{/*<PepperDefaultInput placeholder={"Name ..."} error_style={false} onChange={()=>{}}/>
					<PepperDualInput  onChangeField1={()=>{}} onChangeField2={()=>{}}
														placeHolderIn1={"Name ..."} placeHolderIn2={"Age"} />

					<PepperDateInput style={styles.full_line_field}
							onChange={(val)=>{console.log(val)}} initialDate={toDayDate()}/>

					<PepperGenderInput error_style={false} onChange={(() =>{})} />
					<PepperTextMultiLine numberOfLines={4} error_style={false} placeHolder={"Describe your event in few words ..."} onChange={()=>{}}/>*/}


			</ScrollView>

			<PepperRoundButton
				size={7 * space_unit}
				style={styles.nextButton}
				colors={[indigo, pepper]}
				iconName="pepper-arrowRight"
				onPress={() => {
					// may add conditions here

						carouselProps.concatResults("data")
						carouselProps.nextFormTrigger()


				}}
			/>
		</>)
}

export default CarouselItemQuestionsForm