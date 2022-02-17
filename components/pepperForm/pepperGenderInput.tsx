import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { GenderInputSchema } from './formTypes';
import {
  grey_2, space_unit, color, grey_1, sea,
} from '../../styles/common';
import PepperImage, { PepperImages } from '../pepperImage/pepperImage';
import { Gender } from '../../models/types';

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
        ...( gender === Gender.WOMAN ? { shadowColor: sea } : {})
      }} onPressIn={() => onChange(Gender.WOMAN)}>
        <PepperImage src={PepperImages.Woman} style={{ width: '90%' }}/>
      </TouchableOpacity>
      <TouchableOpacity style={{
        ...styles.genderContainer,
        ...( gender === Gender.MAN ? { shadowColor: sea } : {})
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
  },
  genderContainer: {
    width: '48%',
    overflow: 'hidden',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2 * space_unit,
    padding: 3 * space_unit,
    backgroundColor: color(grey_1, .4),
    borderColor: grey_2,
    elevation: 1,
    shadowColor: grey_1,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    borderRadius: space_unit,
  }
});
