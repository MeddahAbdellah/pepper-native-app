import React from 'react';
import { View, StyleSheet } from 'react-native';
import { white } from '../../styles/common';
import { FormSchema, FormType, PepperForm } from '../pepperForm';
import { codeValidator } from '../pepperForm/validators';
import { useNavigation } from '@react-navigation/native';
import { PepperStackRoutes } from '../../models/routes';
import LoginService from '../../services/login';

const PepperUserCodeLogin = (loginProps: { route: { params: { phoneNumber: string } } }): JSX.Element => {
  const schemas: FormSchema = {
    code: {
      type: FormType.Text,
      label: 'Enter the code received by sms',
      max: 6,
      validator: codeValidator,
    },
  };

  // TODO: Library does not provide a type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <PepperForm schema={schemas} onSubmit={async(loginFormOutput) => {
        const { phoneNumber } = loginProps.route.params;
        const { code } = loginFormOutput;
        // FIX: Type inference
        await LoginService.login(phoneNumber, code as string);
        navigation.navigate(PepperStackRoutes.Main);
      }}/>
    </View>
  );
};

export default PepperUserCodeLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
