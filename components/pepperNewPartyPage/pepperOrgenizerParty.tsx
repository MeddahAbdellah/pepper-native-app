import React from 'react';
import {StyleSheet, View} from 'react-native';
import PepperForm from '../pepperForms/pepperForm';
import {PepperImages} from '../pepperImage/pepperImage';
import {PepperStackRoutes} from '../../models/routes';
import {
  IFormOutput,
  IPageAddableForm, IPageQuestionForm, PepperFormType, PepperInputType,
} from "../pepperForms/Interface";

const subscribtionFormsSchema: Array<IPageAddableForm|IPageQuestionForm> = [
  {
    prefix:"title", typeForm:PepperFormType.QuestionsForm, 
    questions:[
      {id:"EventName", type:PepperInputType.RegularField, placeHolder:"Event Title / Place Name "},
      {id:"EventTheme", type:PepperInputType.RegularField, placeHolder:" Theme ! maybe ? "},
    ], topImage:PepperImages.Waiter 
    
  },
  {
    prefix:"details", typeForm:PepperFormType.QuestionsForm, 
    questions:[

      {id:"EventPlace", type:PepperInputType.RegularField, placeHolder:"Where is the event happening ?"},
      {id:"EventDate", type:PepperInputType.EventDate},
    ], topImage:PepperImages.Waiter 
    
  },
  {
    prefix:"description", typeForm:PepperFormType.QuestionsForm, 
    questions:[
      {
        id:"EventDescription", type:PepperInputType.MultiLineField, placeHolder:"Describe your event in few words ...", linesNumber:4
      },
    ], topImage:PepperImages.Waiter 
    
  },

  {
    prefix:"drinks",typeForm: PepperFormType.AddableForm, bottomImage:PepperImages.Drinks, productCategory:"Drink"
  },
  {
    prefix:"foods",typeForm: PepperFormType.AddableForm,  bottomImage:PepperImages.Food, productCategory:"Food"
  },
];

const PepperNewPartyForm = (): JSX.Element=>(
  <View style={styles.container}>
    <PepperForm pages={subscribtionFormsSchema}
      nextStep={PepperStackRoutes.Tutorial}
      onDataSubmitted={(formData: IFormOutput)=>{
        // TODO: consume formData
        // eslint-disable-next-line no-console
        console.log("form output", formData);
      }}
    />
  </View>
);

export default PepperNewPartyForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
