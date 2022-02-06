import React, { useState} from 'react';

// import Carousel, {  } from 'react-native-snap-carousel';
// import { space_unit, indigo, pepper} from '../../styles/common';

// import PepperRoundButton from '../pepperRoundButton/pepperRoundButton';
import { useNavigation } from '@react-navigation/native';

import PepperItemAddableForm from "./pepperPages/pepperAddableForm";
import {
  IPageAddableForm,IPageImageForm,IPageQuestionForm,IProduct,PepperFormType
} from "./Interface";
import PepperItemQuestionsForm from "./pepperPages/pepperQuestionsForm";
import PepperItemImageForm from "./pepperPages/pepperImageForm";


const  PepperForm = (onBoardingProps: { pages: Array<IPageAddableForm|IPageQuestionForm|IPageImageForm>,
																 nextStep: string,
  resultData:(data:{ [key : string]:IProduct[]|{[key : string]:string|Date|number} })=>void }):JSX.Element=> {


  const [activeIndex, setActiveIndex] = useState(0);
  const [resultAll,setResultAll] = useState<{ [key: string]: any }>({});
  const navigation = useNavigation<any>();

  // a Trigger passed to lower components to allow them to validate form & skip to next
  const goToNextForm = ():void => {
    if(activeIndex !== onBoardingProps.pages.length-1) {
      setActiveIndex(activeIndex+1);
    } else {// last element
      onBoardingProps.resultData(resultAll);
      navigation.navigate(onBoardingProps.nextStep);
    }
  };

  const concatResults = (key:string,value:any):void=>{
    let copy = {...resultAll, [key]: value };
    copy[key] = value;
    setResultAll(copy);
  };

  const StaticPageSelector = (props:{item:IPageAddableForm|IPageQuestionForm|IPageImageForm}):JSX.Element=> <>
    {
      (props.item.typeForm ===PepperFormType.ImagesForm)?
        <PepperItemImageForm item={ props.item as IPageImageForm} nextFormTrigger={goToNextForm}
						 concatResults={(v:any)=>{
							 concatResults(props.item.prefix,v);
						 }} />:
						 null
    }

    {
      (props.item.typeForm ===PepperFormType.QuestionsForm)?
				 <PepperItemQuestionsForm item={ props.item as IPageQuestionForm } nextFormTrigger={goToNextForm}
						 concatResults={(v:any)=>{
							 concatResults(props.item.prefix,v);
						 }} />:
						 null
    }

    {
      (props.item.typeForm ===PepperFormType.AddableForm)?
        <PepperItemAddableForm item={ props.item as IPageAddableForm } nextFormTrigger={goToNextForm}
						 concatResults={(v:any)=>{
							 concatResults(props.item.prefix,v);
						 }} />:
						 null
    }
  </>;

  return (
    <>
      {StaticPageSelector({item:onBoardingProps.pages[activeIndex]})}
    </>
  );
};


export default PepperForm;