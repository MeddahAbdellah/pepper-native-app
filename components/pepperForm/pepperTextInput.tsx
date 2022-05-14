import React, { useState } from 'react';
import {
  StyleSheet, Text, View, TextInput,
} from 'react-native';
import {
  space_unit, grey_3, indigo, fontSizeBody, fontSizeSubSubHeader,
} from '../../styles/common';
import _ from 'lodash';
import { TextInputSchema, KeyBoardType } from './formTypes';
import { sanitizeText, capitalize } from '../../helpers/uiHelper';
import { inputStyle, inputErrorStyle } from './style';

interface ITextInput extends Omit<TextInputSchema, 'type'> {
  onSubmit: (result: {value: string, valid: boolean}) => void,
};

export const PepperTextInput = (textInputProps: ITextInput): JSX.Element => {
  const [error, setError] = useState('');
  const onChange = (value: string): void => {
    const sanitizedValue = capitalize(sanitizeText(value));
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
        keyboardType={textInputProps.keyboardType ? textInputProps.keyboardType : KeyBoardType.Default}
        secureTextEntry={textInputProps.isPassword ?? false}
        defaultValue={textInputProps.initialValue ? textInputProps.initialValue : ''}
        onChangeText={onChange}
        style={{
          ...styles.textInput,
          ...(_.isEmpty(error) ? {} : { shadowColor: indigo }),
          ...(textInputProps.multiline ? styles.multiline : {}),
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
    marginBottom: 2 * space_unit,
  },
  label: {
    fontSize: fontSizeBody,
    marginBottom: space_unit,
    marginLeft: space_unit,
    color: grey_3,
  },
  multiline: {
    paddingTop: 2 * space_unit,
    minHeight: 20 * space_unit,
    textAlignVertical: 'top',
    maxHeight: 30 * space_unit,
    fontSize: fontSizeSubSubHeader,
  },
  error: inputErrorStyle,
  textInput: inputStyle
});
