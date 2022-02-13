import React, { useState } from 'react';
import {
  StyleSheet, Text, View, TextInput 
} from 'react-native';
import {
  space_unit, grey_1, grey_2, pepper_2, grey_3, fontSizeRegular, color,
} from '../../styles/common';
import _ from 'lodash';
import { TextInputSchema } from './formTypes';

interface ITextInput extends Omit<TextInputSchema, 'type'> {
  onSubmit: (result: {value: string, valid: boolean}) => void,
};

export const PepperTextInput = (textInputProps: ITextInput): JSX.Element => {
  const [error, setError] = useState('');
  const onChange = (value: string): void => {
    setError(textInputProps.validator(value));
    textInputProps.onSubmit({value, valid: _.isEmpty(error)});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{textInputProps.label}</Text>
      <TextInput
        multiline={textInputProps.multiline ?? false}
        maxLength={textInputProps.max}
        onChangeText={onChange}
        style={{...styles.textInput, ...(_.isEmpty(error) ? {} : { shadowColor: pepper_2 })}}
        editable
      />
      <Text style={styles.error}>{error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  label: {
    fontSize: fontSizeRegular,
    marginBottom: space_unit,
    marginLeft: space_unit,
    color: grey_3,
  },
  error: {
    marginTop: space_unit,
    marginLeft: space_unit,
    color: pepper_2,
  },
  textInput: {
    padding: 2 * space_unit,
    fontSize: fontSizeRegular,
    color: grey_3,
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
