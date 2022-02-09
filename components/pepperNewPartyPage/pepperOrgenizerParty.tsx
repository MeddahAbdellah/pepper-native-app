import React from 'react';
import {StyleSheet, View} from 'react-native';
import PepperForm from '../pepperForms/pepperForm';
import {PepperImages} from '../pepperImage/pepperImage';
import {PepperStackRoutes} from '../../models/routes';
import { IProduct, PepperFormType, PepperInputType} from "../pepperForms/Interface";

const PepperNewPartyForm = (): JSX.Element=>(
  <View style={styles.container}>
    <PepperForm pages={[
      { prefix:"image_page",typeForm: PepperFormType.ImagesForm, imageForm:{ image:PepperImages.Peace }},
      {
        prefix:"detail_1", typeForm:PepperFormType.QuestionsForm, questionsForm:{
          questions:[
            {id:"EventName", type:PepperInputType.RegularField, placeHolder:"Event Title / Place Name "},
            {id:"EventTheme", type:PepperInputType.RegularField, placeHolder:" Theme ! maybe ? "},
          ], topImage:PepperImages.Waiter 
        }
      },
      {
        prefix:"detail_2", typeForm:PepperFormType.QuestionsForm, questionsForm:{
          questions:[

            {id:"EventPlace", type:PepperInputType.RegularField, placeHolder:"Where is the event happening ?"},
            {id:"EventDate", type:PepperInputType.EventDate},
            /* {id:"11", type:PepperInputType.GenderChoice}, */
            
          ], topImage:PepperImages.Waiter 
        }
      },
      {
        prefix:"detail_3", typeForm:PepperFormType.QuestionsForm, questionsForm:{
          questions:[
            {
              id:"EventDescription", type:PepperInputType.MultiLineField, placeHolder:"Describe your event in few words ...", linesNumber:4
            },
          ], topImage:PepperImages.Waiter 
        }
      },

      { prefix:"drinks_page",typeForm: PepperFormType.AddableForm, addableForm:{ bottomImage:PepperImages.Drinks, productCategory:"Drink"}},
      { prefix:"food_page",typeForm: PepperFormType.AddableForm, addableForm:{ bottomImage:PepperImages.Food, productCategory:"Food"}},
      
    ]}
    nextStep={PepperStackRoutes.Tutorial}

    onDataSubmitted={(_data:{ [key : string]:IProduct[]|{[key : string]:string|Date|number} })=>{
      //  console.log(_data);
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
