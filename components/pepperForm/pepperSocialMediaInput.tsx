import React, { useState } from 'react';
import {
  StyleSheet, Text, View, TextInput,
} from 'react-native';
import {
  space_unit, grey_3, indigo, fontSizeBody, fontSizeSubSubHeader, sea, pepper, white, sun, color,
} from '../../styles/common';
import _ from 'lodash';
import { SocialMediaInputSchema } from './formTypes';
import { inputStyle, inputErrorStyle } from './style';
import PepperIcon from '../pepperIcon/pepperIcon';
import { facebookValidator, instagramValidator, snapchatValidator } from './validators';

interface ISocialMediaInput extends Omit<SocialMediaInputSchema, 'type'> {
  onSubmit: (result: {value: string, valid: boolean}) => void,
};


// TODO: factorize social media input
export const PepperSocialMediaInput = (textInputProps: ISocialMediaInput): JSX.Element => {
  const [errors, setErrors] = useState(['', '', '']);
  const [values, setValues] = useState(['', '', '']);
  const [textInputHeight, setTextInputHeight] = useState<number>(0);
  const onFacebookChange = (value: string): void => {
    const validation = facebookValidator(value);
    errors[0] = validation;
    values[0] = value;
    setErrors(errors);
    setValues(values);
    const hasErrors = !_.isEmpty(errors.join(''));
    const hasAtLeastOneValue = !_.isEmpty(values.join(''));
    textInputProps.onSubmit({ value, valid: !hasErrors && hasAtLeastOneValue });
  };

  const onInstagramChange = (value: string): void => {
    const validation = instagramValidator(value);
    errors[1] = validation;
    values[1] = value;
    setErrors(errors);
    setValues(values);
    const hasErrors = !_.isEmpty(errors.join(''));
    const hasAtLeastOneValue = !_.isEmpty(values.join(''));
    textInputProps.onSubmit({ value, valid: !hasErrors && hasAtLeastOneValue });
  };

  const onSnapchatChange = (value: string): void => {
    const validation = snapchatValidator(value);
    errors[2] = validation;
    values[2] = value;
    setErrors(errors);
    setValues(values);
    const hasErrors = !_.isEmpty(errors.join(''));
    const hasAtLeastOneValue = !_.isEmpty(values.join(''));
    textInputProps.onSubmit({ value, valid: !hasErrors && hasAtLeastOneValue });
  };

  return (
    <View style={styles.container}>
      <Text style={{
        fontSize: fontSizeSubSubHeader,
        textAlign: 'center',
        color: color(grey_3, .9),
      }}>
        Fill in the social media you want to share with your matches
      </Text>
      <View
        pointerEvents="none"
        style={
          { ...styles.icon, bottom: - 2.5 * space_unit - (textInputHeight / 2) }
        }
      >
        <PepperIcon name="pepper-facebook" size={5 * space_unit} color={white}></PepperIcon>
      </View>
      <TextInput
        onLayout={(event): void => {
          setTextInputHeight(event.nativeEvent.layout.height);
        }}
        maxLength={20}
        autoCapitalize='none'
        onChangeText={onFacebookChange}
        style={{
          ...styles.textInput,
          backgroundColor: sea,
          ...(_.isEmpty(errors[0]) ? {} : { shadowColor: indigo }),
        }}
        editable
      />
      <Text style={styles.error}>{errors[0]}</Text>

      <View
        pointerEvents="none"
        style={
          { ...styles.icon, bottom: - 2.5 * space_unit - (textInputHeight / 2) }
        }
      >
        <PepperIcon name="pepper-instagram" size={5 * space_unit} color={white}
        ></PepperIcon>
      </View>
      <TextInput
        maxLength={20}
        autoCapitalize='none'
        onChangeText={onInstagramChange}
        style={{
          ...styles.textInput,
          backgroundColor: pepper,
          ...(_.isEmpty(errors[1]) ? {} : { shadowColor: indigo }),
        }}
        editable
      />
      <Text style={styles.error}>{errors[1]}</Text>

      <View
        pointerEvents="none"
        style={
          { ...styles.icon, bottom: - 2.5 * space_unit - (textInputHeight / 2) }
        }
      >
        <PepperIcon name="pepper-snapchat" size={5 * space_unit} color={white}></PepperIcon>
      </View>
      <TextInput
        maxLength={20}
        autoCapitalize='none'
        onChangeText={onSnapchatChange}
        style={{
          ...styles.textInput,
          backgroundColor: sun,
          ...(_.isEmpty(errors[2]) ? {} : { shadowColor: indigo }),
        }}
        editable
      />
      <Text style={styles.error}>{errors[2]}</Text>
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
  textInput: {
    ...inputStyle,
    color: 'white',
    paddingLeft: 8 * space_unit,
  },
  icon: {
    position: 'relative',
    left: 1.5 * space_unit,
    zIndex: 4,
  }
});
