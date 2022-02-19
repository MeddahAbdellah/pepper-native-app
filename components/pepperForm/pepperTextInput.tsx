import React, { useState } from 'react';
import {
  StyleSheet, Text, View, TextInput,
} from 'react-native';
import {
  space_unit, grey_1, grey_2, grey_3, fontSizeRegular, color, indigo,
} from '../../styles/common';
import _ from 'lodash';
import { TextInputSchema } from './formTypes';
import { sanitizeText } from '../../helpers/uiHelper';

interface ITextInput extends Omit<TextInputSchema, 'type'> {
  onSubmit: (result: {value: string, valid: boolean}) => void,
};

export const PepperTextInput = (textInputProps: ITextInput): JSX.Element => {
  const [error, setError] = useState('');
  const onChange = (value: string): void => {
    const sanitizedValue = sanitizeText(value);
    const validation = textInputProps.validator(sanitizedValue);
    setError(validation);
    textInputProps.onSubmit({ value: sanitizedValue, valid: _.isEmpty(validation) });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{textInputProps.label}</Text>
      <TextInput
        multiline={textInputProps.multiline ?? false}
        maxLength={textInputProps.max}
        defaultValue={textInputProps.initialValue ? textInputProps.initialValue : ''}
        onChangeText={onChange}
        style={{
          ...styles.textInput,
          ...(_.isEmpty(error) ? {} : { shadowColor: indigo }),
          ...(textInputProps.multiline ? { paddingTop: 2 * space_unit, maxHeight: 30 * space_unit } : {}),
        }}
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
    color: indigo,
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
