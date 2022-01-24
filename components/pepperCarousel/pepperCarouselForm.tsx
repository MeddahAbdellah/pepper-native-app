import React, { useState} from 'react'
import {View, Dimensions, TextInput} from 'react-native'

import Carousel, {  } from 'react-native-snap-carousel';
//import { space_unit, indigo, pepper} from '../../styles/common';

//import PepperRoundButton from '../pepperRoundButton/pepperRoundButton';
import { useNavigation } from '@react-navigation/native';

import CarouselItemAddableForm from "./pepperAddableForm";
import {ICarouselPage,PepperFormType} from "./Interface";
import CarouselItemQuestionsForm from "./pepperQuestionsForm";
import CarouselItemImageForm from "./pepperImageForm";



const  PepperCarouselForm = (onBoardingProps: { pages: Array<ICarouselPage>,
																 nextStep: string, resultData:(data:any)=>void })=> {
	const carouselWidth = Dimensions.get("window").width;

	//console.log("PEPPER CAROUSEL LOGS,",onBoardingProps.pages)

	const [activeIndex, setActiveIndex] = useState(0);
	const [resultAll,setResultAll] = useState<{ [key: string]: any }>({})
	const navigation = useNavigation<any>();
	let scrollerRef: Carousel<ICarouselPage> | null;


	// a Trigger passed to lower components to allow them to validate form & skip to next
	const goToNextForm = () => {
			if(activeIndex !== onBoardingProps.pages.length-1)
			{
				setActiveIndex(activeIndex+1)
				scrollerRef?.snapToNext();
			}
			else
			{// last element
				navigation.navigate(onBoardingProps.nextStep)
				//flush all results inside Input function
				onBoardingProps.resultData(resultAll)
			}
	}

	const concatResults = (key:string,value:any)=>{
		let copy = {...resultAll, [key]: value }
		copy[key] = value;
		setResultAll(copy);
	}

	const PageSelector = (props:{item:ICarouselPage})=> {
		//console.log('PageSelectPropos', props);
		return <>
			{
				(props.item.type_form ===PepperFormType.ImagesForm)?
					<CarouselItemImageForm item={ props.item } nextFormTrigger={goToNextForm}
																 concatResults={(v:any)=>{
																	 concatResults(props.item.prefix,v)
																 }} />:null
			}

			{
				(props.item.type_form ===PepperFormType.QuestionsForm)?
				 <CarouselItemQuestionsForm item={ props.item } nextFormTrigger={goToNextForm}
																		 concatResults={(v:any)=>{
																			 //concatResults(props.item.prefix,v)
																		 }} />:null
			}

			{
				(props.item.type_form ===PepperFormType.AddableForm)?
					<CarouselItemAddableForm item={ props.item } nextFormTrigger={goToNextForm}
																	 concatResults={(v:any)=>{
																		 concatResults(props.item.prefix,v)
																	 }} />:null
			}

		</>

		}

	return (
		<View>
			<Carousel
				layout={"default"}
				data={onBoardingProps.pages}
				sliderWidth={carouselWidth}
				itemWidth={carouselWidth}
				scrollEnabled={false}
				ref={(c) => { scrollerRef = c; }}
				renderItem={({ item})=><PageSelector item={item}/>}

				/>

		</View>
	);
}


export default PepperCarouselForm;