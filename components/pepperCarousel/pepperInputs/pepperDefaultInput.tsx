import React from "react";
import {grey_2, pepper, space_unit} from "../../../styles/common";
import {TextInput, View} from "react-native";
import styles from "../styles";


const PepperDefaultInput = (propsIn:{placeholder:string, error_style?:boolean, onChange:(val:string)=>void}) =>{


	return <View style={{ flexDirection:'row',backgroundColor:"#fff",paddingBottom:space_unit*2 }}>
		{<TextInput
		style={{...styles.full_line_field,borderColor:propsIn.error_style?pepper:styles.full_line_field_multiline.borderColor}}
		autoCapitalize="characters"
		onChangeText={(str)=>{
			 propsIn.onChange(str)
		}}
		placeholder={propsIn.placeholder}
		placeholderTextColor={grey_2}
	/>}
	</View>

}

export default PepperDefaultInput;