import React, { useState } from "react";
import {grey_2, pepper, space_unit} from "../../../styles/common";
import {TextInput, View} from "react-native";
import {StyleSheet} from "react-native";



const PepperTextMultiLine = (propsIn:{numberOfLines:number,
  placeHolder:string,
  onChange:(data:string)=>void,
  errorStyle?:boolean} ):JSX.Element=>{

  const [val,setVal] = useState("");

  return <View style={styles.inputHolder}>
    <TextInput
      multiline={true}
      value={val}
      blurOnSubmit={true}
      onChangeText={(text)=>{
        setVal(text);
        propsIn.onChange(val);
      }}
      returnKeyType='done'
      onEndEditing={()=>{
        propsIn.onChange(val);
      }}
      numberOfLines={propsIn.numberOfLines}
      style={{...styles.fullLineFieldMultiline,borderColor:(propsIn.errorStyle)?pepper:styles.fullLineFieldMultiline.borderColor}}
      autoCapitalize="characters"
      placeholder={propsIn.placeHolder} // "Describe your event in few words ..."
      placeholderTextColor={grey_2}
    />
  </View>;
};


export default PepperTextMultiLine;

const styles = StyleSheet.create({

  fullLineFieldMultiline:{
    borderRadius:6,
    borderWidth:1,
    borderColor:"#CCCCCC",
    padding:0.5*space_unit,
    paddingStart:2*space_unit,
    backgroundColor:"#FAFAFA",
    fontSize:18,
    fontWeight:"normal",
    color:"#595959",
    elevation:1,
    textAlignVertical: 'top',
    textAlign:"left",
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