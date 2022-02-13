import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import _ from 'lodash';
import {
  space_unit, white, indigo, pepper 
} from '../../styles/common';
import {
  FormSchema, FormType, TextInputSchema, DateInputSchema 
} from './formTypes';
import { PepperTextInput } from './pepperTextInput';
import PepperRoundButton from '../pepperRoundButton/pepperRoundButton';
import { PepperDateInput } from './pepperDateInput';
import { PepperGenderInput } from './pepperGenderInput';

export const PepperForm = (formProps: { schema: FormSchema, onSubmit: (result: any) => void }): JSX.Element => {
  const [formOutput, setFormOutput] = useState({});
  const schemaToErrorsArray = _.reduce(formProps.schema, (res, _value, key) => ({ ...res, [key]: true }), {});
  const [formErrors, setFormErrors] = useState(schemaToErrorsArray);

  const onFieldSubmit = (key: string, results: { value: string, valid: boolean }): void => {
    const newFormOutput = {...formOutput, [key]: results.value };
    const newFormErrors = {...formErrors, [key]: !results.valid };
    setFormOutput(newFormOutput);
    setFormErrors(newFormErrors);
  };

  return (
    <View style={styles.container}>
      {
        _.map(formProps.schema, (schemaValue, key) => {
          switch(schemaValue.type) {
            case FormType.Text: 
              return <PepperTextInput 
                key={key}
                onSubmit={(fieldOutput: { value: string, valid: boolean }) => { onFieldSubmit(key, fieldOutput); }}
                {..._.omit(schemaValue as TextInputSchema, 'type')}/>;
            case FormType.Date: 
              return <PepperDateInput 
                key={key}
                onSubmit={(fieldOutput: { value: string, valid: boolean }) => { onFieldSubmit(key, fieldOutput); }}
                {..._.omit(schemaValue as DateInputSchema, 'type')}/>;
            case FormType.Gender: 
              return <PepperGenderInput 
                key={key}
                onSubmit={(fieldOutput: { value: string, valid: boolean }) => { onFieldSubmit(key, fieldOutput); }}/>;
            default: 
              return <Text>Missing field</Text>;
          }
        })
      }
      { _.isEmpty(_.filter(formErrors)) ? 
        <PepperRoundButton
          size={7 * space_unit}
          style={styles.nextButton}
          colors={[indigo, pepper]}
          iconName="pepper-arrowRight"
          onPress={() => formProps.onSubmit(formOutput) }
        /> :
        null
      }
    </View>
  );
};
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 4 * space_unit,
    backgroundColor: white,
    justifyContent: 'flex-start',
  },
  nextButton: {
    position: 'absolute',
    bottom: 3 * space_unit,
    right: 2 * space_unit,
    zIndex: 2,
    shadowColor: white,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: .3,
    shadowRadius: 3,
    elevation: 2,
  }
});
