import React from 'react';
import {StyleSheet, View} from 'react-native';
import PepperForm from '../pepperForms/pepperForm'
import {PepperImages} from '../pepperImage/pepperImage';
import {PepperStackRoutes} from '../../models/routes';
import {IProduct, PepperFormType, PepperInputType} from "../pepperForms/Interface";

const pepperNewPartyForm = ()=>{

	return (
		<View style={styles.container}>
			<PepperForm pages={[

				{
					prefix:"prefix1", typeForm:PepperFormType.QuestionsForm, questionsForm:{ questions:[

							{id:"3++", type:PepperInputType.RegularField, placeHolder:"Theme maybe please !"},
/*							{id:"4", type:PepperInputType.EventDate},
							{id:"5", type:PepperInputType.GenderChoice},
*/
						]}
				},
				{
					prefix:"prefix2", typeForm:PepperFormType.QuestionsForm, questionsForm:{ questions:[

							{id:"9", type:PepperInputType.RegularField, placeHolder:"Theme maybe please !"},
							{id:"10", type:PepperInputType.EventDate},
							{id:"11", type:PepperInputType.GenderChoice},
							{id:"12", type:PepperInputType.MultiLineField, placeHolder:"Theme maybe please !", lines_number:4},

						], topImage:PepperImages.Waiter }
				},

				{ prefix:"page1",typeForm: PepperFormType.AddableForm, addableForm:{ bottomImage:PepperImages.Food, productCategory:"Food" }},
				{ prefix:"page2",typeForm: PepperFormType.AddableForm, addableForm:{ bottomImage:PepperImages.Drinks, productCategory:"Drink"}},
			  { prefix:"page4",typeForm: PepperFormType.ImagesForm, imageForm:{ image:PepperImages.Peace }},
			]}
											nextStep={PepperStackRoutes.Tutorial}

											resultData={(data:{ [key : string]:Array<IProduct>|{[key : string]:string|Date|number} })=>{
												console.log(data)
											}}
			/>
		</View>
	);
}

export default pepperNewPartyForm;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
