import React from 'react';
import { View, StyleSheet } from 'react-native';
import { white } from '../../styles/common';
import { FormSchema, FormType } from '../pepperForm';
import {
  legalAgeValidator, nameValidator, cityValidator, alwaysValidValidator, phoneNumberValidator, codeValidator,
} from '../pepperForm';
import { PepperFormStepper } from '../pepperForm/pepperFormStepper';
import { useNavigation } from '@react-navigation/native';
import { PepperStackRoutes } from '../../models/routes';
import LoginService from '../../services/login';
import { Gender } from '../../models/types';

const PepperUserSubscription = (): JSX.Element => {
  const schemas: FormSchema[] = [
    {
      phoneNumber: {
        type: FormType.Text,
        label: 'Confirm your phone number',
        max: 13,
        validator: phoneNumberValidator,
      },
    },
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
      address: {
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
    },
    {
      code: {
        type: FormType.Text,
        label: 'Enter the code received by sms',
        max: 6,
        validator: codeValidator,
      },
    }
  ];

  // TODO: Library does not provide a type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <PepperFormStepper schemas={schemas} onDone={async(subscriptionFormOutput) => {
        // FIX: fix type inferance
        const {
          phoneNumber,
          code,
          name,
          gender,
          address,
          description,
          job,
        } = subscriptionFormOutput;

        await LoginService.subscribe(
          phoneNumber as string,
          code as string,
          name as string,
          gender as Gender,
          address as string,
          description as string,
          job as string,
        );
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
