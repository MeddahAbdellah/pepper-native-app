import React, { useState} from 'react';
import { useNavigation } from '@react-navigation/native';

import PepperItemAddableForm from "./pepperPages/pepperAddableForm";
import {
  IPageAddableForm,IPageQuestionForm,IProduct,PepperFormType
} from "./Interface";
import PepperItemQuestionsForm from "./pepperPages/pepperQuestionsForm";


const  PepperForm = (onBoardingProps: { pages: Array<IPageAddableForm|IPageQuestionForm>,
  nextStep: string,
  onDataSubmitted:(pageData:{ [key : string]:IProduct[]|{[key : string]:string|Date|number} })=>void }):JSX.Element=> {


  const [activeIndex, setActiveIndex] = useState(0);
  const [resultAll,setResultAll] = useState<{ [key: string]: IProduct[]|{[key : string]:string|Date|number} }>({});
  const navigation = useNavigation<any>();

  // a Trigger passed to lower components to allow them to validate form & skip to next
  const goToNextForm = (): void => {
    if(activeIndex !== onBoardingProps.pages.length-1) {
      setActiveIndex(activeIndex + 1);
      return;
    }
    onBoardingProps.onDataSubmitted(resultAll);
    navigation.navigate(onBoardingProps.nextStep);
  };

  const concatResults = (key:string,value:any):void=>{
    let copy = {...resultAll, [key]: value };
    copy[key] = value;
    setResultAll(copy);
  };

  const StaticPageSelector = (props:{item:IPageAddableForm|IPageQuestionForm}):JSX.Element=> <>

    {
      (props.item.typeForm ===PepperFormType.QuestionsForm)?
        <PepperItemQuestionsForm item={ props.item as IPageQuestionForm } nextFormTrigger={goToNextForm}
          onDataSubmitted={(v:any)=>{
            concatResults(props.item.prefix,v);
          }} />:
        null
    }

    {
      (props.item.typeForm ===PepperFormType.AddableForm)?
        <PepperItemAddableForm item={ props.item as IPageAddableForm } nextFormTrigger={goToNextForm}
          onDataSubmitted={(v:any)=>{
            concatResults(props.item.prefix,v);
          }} />:
        null
    }
  </>;

  return (
    <>
      { StaticPageSelector({item:onBoardingProps.pages[activeIndex]}) }
    </>
  );
};


export default PepperForm;