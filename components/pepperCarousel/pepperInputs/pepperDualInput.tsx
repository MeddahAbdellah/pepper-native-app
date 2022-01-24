import React from "react";
import {grey_2, pepper, space_unit} from "../../../styles/common";
import {TextInput, View} from "react-native";
import styles from "../styles";


const PepperDualInput = (dualInput:{
	placeHolderIn1:string, onChangeField1:(val:string)=>void, error_Style1?:boolean
	placeHolderIn2:string, onChangeField2:(val:string)=>void, error_Style2?:boolean}
) =>
	<View style={{ flexDirection:'row',backgroundColor:"#fff",paddingBottom:space_unit*2 }}>
		<TextInput
			style={{...styles.NewItemAddName,marginRight:3*space_unit,padding:0,
				borderColor:dualInput.error_Style1?pepper:styles.NewItemAddName.borderColor}}
			autoCapitalize="characters"
			placeholder={dualInput.placeHolderIn1}
			placeholderTextColor={grey_2}
			onChangeText={(text)=>{
				dualInput.onChangeField1(text)
			}}
		/>
		<TextInput
			style={{...styles.NewItemAddPrice,marginLeft:0,padding:0,
				borderColor:dualInput.error_Style2?pepper:styles.NewItemAddName.borderColor}}
			placeholder={dualInput.placeHolderIn2}
			onChangeText={(text)=>{
				dualInput.onChangeField2(text)
			}}
			keyboardType="decimal-pad"
			placeholderTextColor={grey_2}
		/>
	</View>

export default PepperDualInput