import React, { useState } from 'react';
import {

  Button,
  ScrollView,
  StyleSheet, TouchableOpacity, View, Text,
} from 'react-native';
import { IPartyEvent } from '../../../../models/types';
import {

  fontSizeRegular,
  indigo_3,
  space_unit,
} from '../../../../styles/common';
import {
  alwaysValidValidator,
  KeyBoardType, numberValidator, PepperTextInput, priceValidator, themeValidator,
} from '../../../pepperForm';


export const PepperOrganizerNewpartyModel = (modelProps: {onGoBack: () => void, onCreate: (partyInfo: IPartyEvent) => void}): JSX.Element => {

  const [theme, setTheme] = useState('');
  const [people, setnbPeople] = useState('');
  const [minAge, setminAge] = useState('');
  const [maxAge, setmaxAge] = useState('');
  const [price, setPrice] = useState('');

  const [errors, setErrors] = useState({
    theme: true, nbPeople: true, minAge: true, maxAge: true, price: true
  });

  const errorExist = (): boolean => errors.maxAge || errors.minAge || errors.theme || errors.nbPeople || errors.price;

  return ( <ScrollView style={styles.container}>
    <TouchableOpacity style={styles.loginButton} onPress={() => { modelProps.onGoBack(); }}>
      <Text style={styles.loginText}>Go Back ?</Text>
    </TouchableOpacity>

    <PepperTextInput label={'Theme'} max={20} validator={themeValidator} onSubmit={ (result: {value: string, valid: boolean}) => {
      setTheme(result.value);
      setErrors({ ...errors, theme: result.valid });
    } } />

    <PepperTextInput label={'Number of Attendees'} max={20} keyboardType={KeyBoardType.Numeric}
      validator={numberValidator} onSubmit={ (result: {value: string, valid: boolean}) => {
        setnbPeople(result.value);
        setErrors({ ...errors, nbPeople: result.valid });
      } } />

    <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' } }>
      <View style={{ flex: 1, margin: space_unit * 2 }}>
        <PepperTextInput label={'Min Age'} max={20} keyboardType={KeyBoardType.Numeric}
          validator={alwaysValidValidator} onSubmit={ (result: {value: string, valid: boolean}) => {
            setminAge(result.value);
            setErrors({ ...errors, minAge: result.valid });
          } } />
      </View>

      <View style={{ flex: 1, margin: space_unit * 2 }}>
        <PepperTextInput label={'Max Age'} max={20} keyboardType={KeyBoardType.Numeric}
          validator={alwaysValidValidator} onSubmit={ (result: {value: string, valid: boolean}) => {
            setmaxAge(result.value);
            setErrors({ ...errors, maxAge: result.valid });
          } } />
      </View>
    </View>

    <PepperTextInput label={'price €'} max={20} keyboardType={KeyBoardType.Numeric}
      validator={priceValidator} onSubmit={ (result: {value: string, valid: boolean}) => {
        setPrice(result.value);
        setErrors({ ...errors, price: result.valid });
      } } />
    <Button disabled={!errorExist()} title="Create Party" onPress={ async() => {
      modelProps.onCreate({
        theme, date: '', people: +people, maxAge: +maxAge, minAge: +minAge, price: +price
      });
    }}/>



  </ScrollView>);
};


const styles = StyleSheet.create({
  container: {
    width: '90%',
  },
  loginButton: {
    zIndex: 2,
    alignSelf: 'flex-end'
  },
  loginText: {
    fontSize: fontSizeRegular,
    color: indigo_3,
    textDecorationLine: 'underline'
  }
});
