import React from 'react';
import { View, StyleSheet } from 'react-native';
import { white } from '../../styles/common';
import { PepperForm, FormSchema, FormType } from '../pepperForm';
import _ from 'lodash';
import moment, { Moment } from 'moment';

const PepperUserSubscription = (): JSX.Element => {
  const schema: FormSchema = {
    name: {
      type: FormType.Text,
      label: 'Name',
      max: 20,
      validator: (value: string) => { if (_.isEmpty(value)) { return 'You must fill your name'; } return ''; },
    },
    gender: {
      type: FormType.Gender,
    },
    address: {
      type: FormType.Text,
      label: 'Address',
      max: 20,
      validator: (value: string) => { if (_.isEmpty(value)) { return 'You must fill your address'; } return ''; },
    },
    dateOfBirth: {
      type: FormType.Date,
      label: 'Date of birth',
      validator: (value: Moment) => { 
        const eighteenYearsAgo = moment().subtract(18, 'years').startOf('year');
        const validDateOfBirth = moment(value).isSameOrBefore(eighteenYearsAgo);
        if (!validDateOfBirth) { return 'You must be over 18'; } return '';
      },
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
