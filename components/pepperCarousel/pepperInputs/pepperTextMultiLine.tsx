import React from "react";
import {grey_2, pepper, space_unit} from "../../../styles/common";
import {TextInput, View} from "react-native";
import styles from "../styles";


const PepperTextMultiLine = (propsIN:{numberOfLines:number,
	placeHolder:string,
	onChange:(data:string)=>void,
	error_style?:boolean}
)=>

	<View style={{ flexDirection:'row',backgroundColor:"#fff",paddingBottom:space_unit*2 }}>
		<TextInput
			multiline={true}
			numberOfLines={propsIN.numberOfLines}
			style={{...styles.full_line_field_multiline,borderColor:propsIN.error_style?pepper:styles.full_line_field_multiline.borderColor}}
			//value={"name"}
			autoCapitalize="characters"
			placeholder={propsIN.placeHolder} // "Describe your event in few words ..."
			placeholderTextColor={grey_2}
		/>
	</View>

export default PepperTextMultiLine