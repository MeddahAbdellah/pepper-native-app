import React from 'react';
import {StyleSheet, View} from 'react-native';
import PepperCarouselForm from '../pepperCarousel/pepperCarouselForm';
import {PepperImages} from '../pepperImage/pepperImage';
import {PepperStackRoutes} from '../../models/routes';
import {PepperFormType, PepperInputType} from "../pepperCarousel/Interface";

const pepperNewPartyForm = ()=>{

	return (
		<View style={styles.container}>
			<PepperCarouselForm pages={[

				{
					prefix:"prefix1", type_form:PepperFormType.QuestionsForm, questions_form:{ questions:[

							{id:"3++", type:PepperInputType.RegularField, placeHolder:"Theme maybe please !"},
/*							{id:"4", type:PepperInputType.EventDate},
							{id:"5", type:PepperInputType.GenderChoice},
*/
						]}
				},
				{
					prefix:"prefix2", type_form:PepperFormType.QuestionsForm, questions_form:{ questions:[
							{id:"7", type:PepperInputType.DualInputFields, placeHolder:"Name ... | Age"},
/*							{id:"8", type:PepperInputType.DualInputFields, placeHolder:"Name ... | Age"},
							{id:"9", type:PepperInputType.RegularField, placeHolder:"Theme maybe please !"},
							{id:"10", type:PepperInputType.EventDate},
							{id:"11", type:PepperInputType.GenderChoice},
							{id:"12", type:PepperInputType.MultiLineField, placeHolder:"Theme maybe please !", lines_number:4},
*/
						], top_image:PepperImages.Waiter }
				},


				{ prefix:"page1",type_form: PepperFormType.AddableForm, addable_form:{ bottom_image:PepperImages.Food, product_category:"Food" }},
				{ prefix:"page2",type_form: PepperFormType.AddableForm, addable_form:{ bottom_image:PepperImages.Drinks, product_category:"Drink"}},
			  { prefix:"page4",type_form: PepperFormType.ImagesForm, image_form:{ image:PepperImages.Peace }},
			]}
											nextStep={PepperStackRoutes.Tutorial}

													resultData={(data: any)=>{
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
