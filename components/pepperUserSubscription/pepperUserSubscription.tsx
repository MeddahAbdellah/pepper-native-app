import React from 'react';
import { View, StyleSheet } from 'react-native';
import { white } from '../../styles/common';
import { FormSchema, FormType } from '../pepperForm';
import {
  legalAgeValidator, nameValidator, cityValidator, alwaysValidValidator,
} from '../pepperForm/validators';
import { PepperFormStepper } from '../pepperForm/pepperFormStepper';
import { useNavigation } from '@react-navigation/native';
import { PepperStackRoutes } from '../../models/routes';

const PepperUserSubscription = (): JSX.Element => {
  const schemas: FormSchema[] = [
    {
      name: {
        type: FormType.Text,
        label: 'Name',
        max: 20,
        validator: nameValidator,
      },
      gender: {
        type: FormType.Gender,
      },
      dateOfBirth: {
        type: FormType.Date,
        label: 'Date of birth',
        validator: legalAgeValidator,
      },
    },
    {
      job: {
        type: FormType.Text,
        label: 'Job',
        max: 20,
        validator: nameValidator,
      },
      ville: {
        type: FormType.Text,
        label: 'Ville',
        max: 30,
        validator: cityValidator,
      },
      description: {
        type: FormType.Text,
        label: 'description',
        multiline: true,
        max: 200,
        validator: alwaysValidValidator,
      },
    }
  ];

  // TODO: Library does not provide a type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <PepperFormStepper schemas={schemas} onDone={(value) => {
        // eslint-disable-next-line no-console
        console.log('submit', value);
        navigation.navigate(PepperStackRoutes.Tutorial);
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
