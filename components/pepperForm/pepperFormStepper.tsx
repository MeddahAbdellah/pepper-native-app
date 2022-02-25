import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import _ from 'lodash';
import { FormSchema, MenuItem } from './formTypes';
import { PepperForm } from './pepperForm';

export const PepperFormStepper = (formProps: {
  schemas: FormSchema[],
  onDone: (result: { [key: string]: string | MenuItem[] | string[] }) => void,
}): JSX.Element => {
  const [stepperFormOutput, setStepperFormOutput] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const onFormSubmit = (output: { [key: string]: string | MenuItem[] | string[] }): void => {
    const newStepperOutput = { ...stepperFormOutput, ...output };
    setStepperFormOutput(newStepperOutput);
    if (currentIndex < (formProps.schemas.length - 1)) {
      setCurrentIndex(currentIndex + 1);
      return;
    }
    formProps.onDone(newStepperOutput);
  };

  return (
    <View style={styles.container}>
      {
        _.map(formProps.schemas, (schema, index) => (
          index === currentIndex ?
            <PepperForm key={_.first(_.keys(schema))} schema={schema} onSubmit={onFormSubmit}/> :
            null
        ))
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
});
