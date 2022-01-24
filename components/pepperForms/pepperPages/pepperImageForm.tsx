import {PepperFormType} from "../Interface";
import PepperImage, {PepperImages} from "../../pepperImage/pepperImage";
//import {strict as assert} from "assert";
import { Text, View} from "react-native";
import styles from "../styles";
import React from "react";
import {indigo, pepper, space_unit} from "../../../styles/common";
import PepperRoundButton from "../../pepperRoundButton/pepperRoundButton";

const CarouselItemImageForm = (carouselProps: { item: { prefix: string, typeForm: PepperFormType, imageForm?: {
			image:PepperImages,
		},


	},nextFormTrigger:()=>void, concatResults:(data:any)=>void }) => {


	return (
		<>
			<View style={{...styles.container}}>
				<PepperImage src={carouselProps.item.imageForm!.image} style={styles.image}/>
				<Text style={styles.description}>{"NOT IMPLEMENTED YET"}</Text>
			</View>
			<PepperRoundButton
				size={7 * space_unit}
				style={{ ...styles.nextButton, zIndex:30 }}
				colors={[indigo, pepper]}
				iconName="pepper-arrowRight"
				onPress={() => {

					carouselProps.nextFormTrigger()

				}}
			/>
		</>
)
}

export default CarouselItemImageForm