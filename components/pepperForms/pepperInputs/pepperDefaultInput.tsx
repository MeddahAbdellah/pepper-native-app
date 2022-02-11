import React, { useState } from "react";
import {grey_2, space_unit} from "../../../styles/common";
import {TextInput, View} from "react-native";
import { StyleSheet } from "react-native";


const PepperDefaultInput = (propsIn:{placeholder:string, errorStyle?:boolean, onChange:(val:string)=>void}):JSX.Element =>{

  const [val, setVal] = useState("");

  return <View style={styles.inputHolder}>
    <TextInput
      style={styles.fullLineField}
      autoCapitalize="characters"
      value={val}
      onChangeText={(str)=>{
        setVal(str);
        propsIn.onChange(str);
      }}
      onEndEditing={()=>{
        propsIn.onChange(val);
      }}

      placeholder={propsIn.placeholder}
      placeholderTextColor={grey_2}
    />
  </View>;

};

export default PepperDefaultInput;

const styles = StyleSheet.create({
  fullLineField: {
    borderRadius:6,
    borderWidth:1,
    borderColor:"#CCCCCC",
    height:8*space_unit,
    padding:0.5*space_unit,
    paddingStart:2*space_unit,
    backgroundColor:"#FAFAFA",
    fontSize:20,
    fontWeight:"normal",
    color:"#595959",
    elevation:1,
    marginLeft:"5%",
    width:"90%",
    marginRight:"5%"
  },

  inputHolder:{
    flexDirection:'row',
    backgroundColor:"#fff",
    paddingBottom:space_unit*2
  }
});