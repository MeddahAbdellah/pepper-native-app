import React, { useState} from 'react'

//import Carousel, {  } from 'react-native-snap-carousel';
//import { space_unit, indigo, pepper} from '../../styles/common';

//import PepperRoundButton from '../pepperRoundButton/pepperRoundButton';
import { useNavigation } from '@react-navigation/native';

import CarouselItemAddableForm from "./pepperPages/pepperAddableForm";
import {ICarouselPage,IProduct,PepperFormType} from "./Interface";
import CarouselItemQuestionsForm from "./pepperPages/pepperQuestionsForm";
import CarouselItemImageForm from "./pepperPages/pepperImageForm";


const  PepperForm = (onBoardingProps: { pages: Array<ICarouselPage>,
																 nextStep: string,
	resultData:(data:{ [key : string]:Array<IProduct>|{[key : string]:string|Date|number} })=>void })=> {


	const [activeIndex, setActiveIndex] = useState(0);
	const [resultAll,setResultAll] = useState<{ [key: string]: any }>({})
	const navigation = useNavigation<any>();

	// a Trigger passed to lower components to allow them to validate form & skip to next
	const goToNextForm = () => {
			if(activeIndex !== onBoardingProps.pages.length-1)
			{
				setActiveIndex(activeIndex+1)
			}
			else
			{// last element
				onBoardingProps.resultData(resultAll)
				navigation.navigate(onBoardingProps.nextStep)
			}
	}

	const concatResults = (key:string,value:any)=>{
		let copy = {...resultAll, [key]: value }
		copy[key] = value;
		setResultAll(copy);
	}

	const PageSelector = (props:{item:ICarouselPage})=> {
		return <>
			{
				(props.item.typeForm ===PepperFormType.ImagesForm)?
					<CarouselItemImageForm item={ props.item } nextFormTrigger={goToNextForm}
						 concatResults={(v:any)=>{
							 concatResults(props.item.prefix,v)
						 }} />:null
}

			{
				(props.item.typeForm ===PepperFormType.QuestionsForm)?
				 <CarouselItemQuestionsForm item={ props.item } nextFormTrigger={goToNextForm}
						 concatResults={(v:any)=>{
							 concatResults(props.item.prefix,v)
						 }} />:null
			}

			{
				(props.item.typeForm ===PepperFormType.AddableForm)?
					<CarouselItemAddableForm item={ props.item } nextFormTrigger={goToNextForm}
						 concatResults={(v:any)=>{
							 concatResults(props.item.prefix,v)
						 }} />:null
			}
		</>
	}

	return (
		<>
			{PageSelector({item:onBoardingProps.pages[activeIndex]})}
		</>
	);
}


export default PepperForm;