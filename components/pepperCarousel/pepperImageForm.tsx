import {PepperFormType} from "./Interface";
import PepperImage, {PepperImages} from "../pepperImage/pepperImage";
import {strict as assert} from "assert";
import {Text, View} from "react-native";
import styles from "./styles";
import React from "react";
import {indigo, pepper, space_unit} from "../../styles/common";
import PepperRoundButton from "../pepperRoundButton/pepperRoundButton";

const CarouselItemImageForm = (carouselProps: { item: { prefix: string, type_form: PepperFormType, image_form?: {
			image:PepperImages,
		},


	},nextFormTrigger:()=>void, concatResults: (image:any)=>void, }) => {

	assert(carouselProps.item.image_form !== undefined);

	return (

		<>
			<View style={styles.container}>
				<PepperImage src={carouselProps.item.image_form.image} style={styles.image}/>
				<Text style={styles.description}>{"NOT IMPLEMENTED YET"}</Text>
			</View>

			<PepperRoundButton
				size={7 * space_unit}
				style={styles.nextButton}
				colors={[indigo, pepper]}
				iconName="pepper-arrowRight"
				onPress={() => {
					// may add conditions here
					console.log("image done")
					//maybe add carouselProps.concatResults() here
					carouselProps.nextFormTrigger()

				}}
			/>
	</>)
}

export default CarouselItemImageForm