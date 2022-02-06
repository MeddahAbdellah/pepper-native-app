import {IField, PepperInputType} from "../Interface";
import PepperImage, {PepperImages} from "../../pepperImage/pepperImage";
import {ScrollView, View} from "react-native";
import styles from "../formStyles";
import React  from "react";
import {indigo, pepper, space_unit} from "../../../styles/common";
import PepperRoundButton from "../../pepperRoundButton/pepperRoundButton";
import PepperDateInput from "../pepperInputs/pepperDateInput";
import PepperGenderInput from "../pepperInputs/pepperGenderInput";
import PepperTextMultiLine from "../pepperInputs/pepperTextMultiLine";
import PepperDefaultInput from "../pepperInputs/pepperDefaultInput";
import Toast from "react-native-root-toast";


const PepperItemQuestionsForm = (carouselProps: { item: { prefix:string,  questionsForm: {
  questions: IField[],
  topImage?:PepperImages,
},
}, nextFormTrigger:()=>void, concatResults: (data:{[key: string]:Date|number|string})=>void, }):JSX.Element => {


  let allInputs: {[key: string]: string|Date|number} = {};

  carouselProps.item.questionsForm??{questions:Array<IField>()}.questions.forEach((question)=>{
    switch (question.type){
      case PepperInputType.EventDate:
        allInputs[question.id] = toDayDate();
        break;
      default:
        allInputs[question.id] = "";
        break;
    }
  });

  const checkAndSetErrors = ():boolean =>{
    let correct = true;
    carouselProps.item.questionsForm?.questions.forEach((key)=>{
      if((allInputs[key.id] === undefined) || (allInputs[key.id] === "")){
        correct = false;
      }
    });
    return correct;
  };

  function toDayDate():Date{
    let date1 = new Date();
    if(date1.getHours() >= 21) {
      date1.setDate(date1.getDate() + 1);
    }
    // date1.setFullYear(1999);
    date1.setHours(21);
    date1.setMinutes(0);
    date1.setSeconds(0);
    return date1;
  }

  const StaticItemsQuestions = (items: IField[]):JSX.Element=><>
    {items.map((i)=><StaticAdequateInput key={i.id} input={i}  />)}
  </>;

  const StaticAdequateInput = (props:{input:IField,}):JSX.Element=><>
    {(props.input.type===PepperInputType.RegularField)?
      <PepperDefaultInput  onChange={(_e)=>{
        allInputs[props.input.id] = _e;
      }} placeholder={props.input.placeHolder??""} />:
	  null
    }

    {(props.input.type===PepperInputType.GenderChoice)?
      <PepperGenderInput  onChange={(_e)=>{
        allInputs[props.input.id] = _e;
				 }}/>:
				 null
    }

    {(props.input.type===PepperInputType.MultiLineField)?
      <PepperTextMultiLine  numberOfLines={props.input.linesNumber??1} placeHolder={props.input.placeHolder??""}
        onChange={(_e)=>{	allInputs[props.input.id] = _e;}}/>:
      null
    }

    {(props.input.type === PepperInputType.EventDate) ?
      <PepperDateInput style={styles.fullLineField} initialDate={toDayDate()} onChange={(_e) => {
        allInputs[props.input.id] = _e;
      }}/> :
	  null
    }

  </>;
  return (
    <>
      <ScrollView style={styles.containerInput} keyboardShouldPersistTaps={"always"}>

        {(carouselProps.item.questionsForm.topImage !== undefined)?
          (<View
            style={{
              alignSelf:"flex-end",height:18*space_unit,backgroundColor:"#fff", width:"50%"
            }}>
            <PepperImage src={carouselProps.item.questionsForm.topImage} style={styles.bottomImage}/>
          </View>) :
		  null}
        {(carouselProps.item.questionsForm.topImage === undefined)?
          (<View
            style={{alignSelf:"flex-end",height:8*space_unit,backgroundColor:"#fff"}}>
          </View>) :
		  null}


        {StaticItemsQuestions(carouselProps.item.questionsForm.questions)}

      </ScrollView>
      <PepperRoundButton
        size={7 * space_unit}
        style={styles.nextButton}
        colors={[indigo, pepper]}
        iconName="pepper-arrowRight"
        onPress={() => {
          if(checkAndSetErrors()) {
            carouselProps.concatResults(allInputs);
            carouselProps.nextFormTrigger();
          } else {
            Toast.show('Please fill all fields', {
              duration: Toast.durations.LONG,
              position: Toast.positions.BOTTOM,
              shadow: true,
              animation: true,
              hideOnPress: true,
              delay: 0,
            });
          }
        }}
      />
    </>);
};

export default PepperItemQuestionsForm;