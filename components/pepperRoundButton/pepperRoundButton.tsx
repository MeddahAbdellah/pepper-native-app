import React from 'react';
import { LinearGradient } from "expo-linear-gradient";
import PepperIcon from "../pepperIcon/pepperIcon";
import { white } from "../../styles/common";
import { TouchableOpacity } from 'react-native';

const PepperRoundButton = (props: { size: number, style?: any, colors: string[], iconName: string , onPress: () => void }) => {
  return (
    <TouchableOpacity onPress={() => props.onPress()} style={{
        ...props.style,
      }}>
      <LinearGradient 
        colors={props.colors}
        style={{
          width: props.size,
          height: props.size,
          borderRadius: .5 * props.size,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        start={{
          x: 0,
          y: .5,
        }}
        end={{
          x: 1,
          y: .5,
        }}>
          <PepperIcon name={props.iconName} size={.4 * props.size} color={props.style.color ? props.style.color : white}></PepperIcon>
        </LinearGradient>
    </TouchableOpacity>
)
};

export default PepperRoundButton;