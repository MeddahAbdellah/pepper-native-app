import React from 'react';
import { View, StyleSheet } from 'react-native';
import { white } from '../../styles/common';
import { PepperForm, FormSchema, FormType } from '../pepperForm';
import {
  legalAgeValidator, nameValidator, cityValidator, alwaysValidValidator 
} from '../pepperForm/validators';

const PepperUserSubscription = (): JSX.Element => {
  const schema: FormSchema = {
    name: {
      type: FormType.Text,
      label: 'Name',
      max: 20,
      validator: nameValidator,
    },
    gender: {
      type: FormType.Gender,
    },
    ville: {
      type: FormType.Text,
      label: 'Ville',
      max: 30,
      validator: cityValidator,
    },
    dateOfBirth: {
      type: FormType.Date,
      label: 'Date of birth',
      validator: legalAgeValidator,
    },
    description: {
      type: FormType.Text,
      label: 'description',
      multiline: true,
      max: 200,
      validator: alwaysValidValidator,
    },
  };

  return (
    <View style={styles.container}>
      <PepperForm schema={schema} onSubmit={(value) => {
        // eslint-disable-next-line no-console
        console.log('submit', value);
      }}/>
    </View>
  );
};

export default PepperUserSubscription;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
