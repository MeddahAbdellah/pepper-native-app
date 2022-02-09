import React, {useState} from "react";
import {TouchableOpacity, View} from "react-native";
import {StyleSheet} from "react-native";
import PepperImage, {PepperImages} from "../../pepperImage/pepperImage";
import {pepper, space_unit,indigo} from "../../../styles/common";


const PepperGenderInput = (propsInput:{onChange:(gender:string)=>void,errorStyle?:boolean}):JSX.Element=>{

  const [gender,setGender] = useState("");

  return <View style={styles.choiceHolder}>
    <TouchableOpacity onPress={()=>{
      setGender("Man");
      propsInput.onChange("Man");
    }}
    style={{...styles.genderImageHolder,borderColor:(propsInput.errorStyle)?pepper:((gender=="Man")?indigo:"#CCCCCC")}}>
      <PepperImage src={PepperImages.Man} style={styles.genderImage}/>
    </TouchableOpacity>

    <TouchableOpacity
      style={{...styles.genderImageHolder,borderColor:(propsInput.errorStyle)?pepper:((gender=="Woman")?indigo:"#CCCCCC")}} onPress={()=>{
        setGender("Woman");
        propsInput.onChange("Woman");
      }}>
      <PepperImage src={PepperImages.Woman} style={styles.genderImage}/>
    </TouchableOpacity>
  </View>;
};

export default PepperGenderInput;

const styles = StyleSheet.create({

  genderImage:{
    width:"100%",
    height:"100%",
  },

  genderImageHolder:{
    backgroundColor:"#FAFAFA",
    borderRadius:10,
    borderWidth:2,
    borderColor:"#CCCCCC",
    alignSelf:"flex-end",
    height:30*space_unit,
    width:"42%",
  },

  choiceHolder:{
    flexDirection:'row',
    justifyContent: 'space-evenly',
    backgroundColor:"#fff",
    paddingBottom:space_unit*2 ,
  }
});
