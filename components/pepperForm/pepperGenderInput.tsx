import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { GenderInputSchema } from './formTypes';
import {
  sky, color, sea, space_unit,
} from '../../styles/common';
import PepperImage, { PepperImages } from '../pepperImage/pepperImage';
import { Gender } from '../../models/types';
import { inputStyle } from './style';

interface IGenderInput extends Omit<GenderInputSchema, 'type'> {
  onSubmit: (result: {value: Gender, valid: boolean}) => void,
};

export const PepperGenderInput = (genderInputProps: IGenderInput): JSX.Element => {
  const [gender, setGender] = useState<Gender | null>(null);
  const onChange = (value: Gender): void => {
    setGender(value);
    genderInputProps.onSubmit({ value, valid: true });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{
        ...styles.genderContainer,
        ...( gender === Gender.WOMAN ? { backgroundColor: color(sea, .4) } : {})
      }} onPressIn={() => onChange(Gender.WOMAN)}>
        <PepperImage src={PepperImages.Woman} style={{ width: '90%' }}/>
      </TouchableOpacity>
      <TouchableOpacity style={{
        ...styles.genderContainer,
        ...( gender === Gender.MAN ? { backgroundColor: color(sky, .4) } : {})
      }} onPressIn={() => onChange(Gender.MAN)}>
        <PepperImage src={PepperImages.Man} style={{ width: '90%' }}/>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2 * space_unit,
  },
  genderContainer: {
    width: '48%',
    overflow: 'hidden',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    ...inputStyle,
  }
});
