import React, {useState} from "react";
import {TouchableOpacity, View} from "react-native";
import styles from "../styles";
import PepperImage, {PepperImages} from "../../pepperImage/pepperImage";
import {pepper, space_unit,indigo} from "../../../styles/common";


const PepperGenderInput = (PropsInput:{onChange:(gender:string)=>void,error_style?:boolean})=>{

	const [gender,setGender] = useState("")

	return <View style={{ flexDirection:'row',justifyContent: 'space-evenly',backgroundColor:"#fff",paddingBottom:space_unit*2 ,}}>
		<TouchableOpacity onPress={()=>{setGender("Man")
			PropsInput.onChange("Man")}}
			style={{...styles.gender_image_holder,borderColor:(PropsInput.error_style)?pepper:((gender=="Man")?indigo:"#CCCCCC")}}>
			<PepperImage src={PepperImages.Man} style={styles.gender_image}/>
		</TouchableOpacity>

		<TouchableOpacity
			style={{...styles.gender_image_holder,borderColor:(PropsInput.error_style)?pepper:((gender=="Woman")?indigo:"#CCCCCC")}} onPress={()=>{setGender("Woman")
			PropsInput.onChange("Woman")}}>
			<PepperImage src={PepperImages.Woman} style={styles.gender_image}/>
		</TouchableOpacity>
	</View>
}

export default PepperGenderInput