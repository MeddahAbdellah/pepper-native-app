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

export const PepperForm = (formProps: { schema: FormSchema, onSubmit: (result: any) => void }): JSX.Element => {
  const [canSubmit, setCanSubmit] = useState(false);
  const [formOutput, setFormOutput] = useState({});

  const onFieldSubmit = (key: string, value: string): void => {
    setCanSubmit(false);
    const newFormOutput = {...formOutput, [key]: value };
    setFormOutput(newFormOutput);
    const allKeysExist = _.isEqual(_.keys(newFormOutput).sort(), _.keys(formProps.schema).sort());
    const areKeysFilled = _.isEmpty(_.filter(_.values(newFormOutput), (value) => _.isEmpty(value) ));
    if (allKeysExist && areKeysFilled) {
      setCanSubmit(true);
    }
  };

  return (
    <View style={styles.container}>
      {
        _.map(formProps.schema, (schemaValue, key) => {
          switch(schemaValue.type) {
            case FormType.Text: 
              return <PepperTextInput 
                key={key}
                onSubmit={(fieldOutput: string) => { onFieldSubmit(key, fieldOutput); }}
                {..._.omit(schemaValue as TextInputSchema, 'type')}/>;
            case FormType.Date: 
              return <PepperDateInput 
                key={key}
                onSubmit={(fieldOutput: string) => { onFieldSubmit(key, fieldOutput); }}
                {..._.omit(schemaValue as DateInputSchema, 'type')}/>;
            default: 
              return <Text>Missing field</Text>;
          }
        })
      }
      { canSubmit ? 
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
