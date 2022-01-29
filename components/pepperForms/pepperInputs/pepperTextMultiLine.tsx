import React, { useState } from "react";
import {grey_2, pepper, space_unit} from "../../../styles/common";
import {TextInput, View} from "react-native";
import styles from "../styles";


const PepperTextMultiLine = (propsIn:{numberOfLines:number,
  placeHolder:string,
  onChange:(data:string)=>void,
  errorStyle?:boolean} ):JSX.Element=>{

  const [val,setVal] = useState("");

  return <View style={{ flexDirection:'row',backgroundColor:"#fff",paddingBottom:space_unit*2 }}>
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
      style={{...styles.full_line_field_multiline,borderColor:(propsIn.errorStyle)?pepper:styles.full_line_field_multiline.borderColor}}
      autoCapitalize="characters"
      placeholder={propsIn.placeHolder} // "Describe your event in few words ..."
      placeholderTextColor={grey_2}
    />
  </View>;
};


export default PepperTextMultiLine;