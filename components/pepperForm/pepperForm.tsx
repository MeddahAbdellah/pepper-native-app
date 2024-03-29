import React, { useState } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, ScrollView,
} from 'react-native';
import _ from 'lodash';
import {
  space_unit, white, indigo, pepper, indigo_3,
} from '../../styles/common';
import {
  FormSchema, FormType, TextInputSchema, DateInputSchema, MenuItem, MenuInputSchema, ImageItem, TagSchema, ImageInputSchema, SocialMediaInputSchema,
} from './formTypes';
import { PepperTextInput } from './pepperTextInput';
import PepperRoundButton from '../pepperRoundButton/pepperRoundButton';
import { PepperDateInput } from './pepperDateInput';
import { PepperGenderInput } from './pepperGenderInput';
import { PepperMenuInput } from './pepperMenuInput';
import { PepperImageInput } from './pepperImageInput';
import { PepperTagsInput } from './pepperTagsInput';
import { PepperSocialMediaInput } from './pepperSocialMediaInput';


export const PepperForm = (formProps: {
  schema: FormSchema,
  onSubmit: (result: { [key: string]: string | MenuItem[] | string[] }) => void,
  // style could be anything
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style?: any,
  hasUpdateButton?: boolean,
  submitOnImageChange?: boolean,
}): JSX.Element => {
  const [formOutput, setFormOutput] = useState({});
  const schemaToErrorsArray = _.reduce(formProps.schema, (res, _value, key) => ({ ...res, [key]: true }), {});
  const [formErrors, setFormErrors] = useState(schemaToErrorsArray);
  const [changedAtLeastOnce, setChangedAtLeastOnce] = useState(false);

  const onFieldSubmit = (key: string, result: { value: string | MenuItem[] | ImageItem[] | string[], valid: boolean }, submit?: boolean): void => {
    setChangedAtLeastOnce(true);
    const newFormOutput = { ...formOutput, [key]: result.value };
    const newFormErrors = { ...formErrors, [key]: !result.valid };
    setFormOutput(newFormOutput);
    setFormErrors(newFormErrors);
    if (submit) {formProps.onSubmit(newFormOutput); }
  };

  const onSubmit = (): void => {
    setChangedAtLeastOnce(false);
    formProps.onSubmit(formOutput);
  };

  const StaticValidateButton = (): JSX.Element => (!formProps.hasUpdateButton ?
    <PepperRoundButton
      size={7 * space_unit}
      style={styles.nextButton}
      colors={[indigo, pepper]}
      iconName="pepper-arrowRight"
      onPress={onSubmit}
    /> :
    <TouchableOpacity>
      <TouchableOpacity style={styles.validateButton}
        onPress={onSubmit}>
        <Text style={styles.validateButtonText}>Update</Text>
      </TouchableOpacity>
    </TouchableOpacity>);

  return (
    <View style={{ ...styles.container, ...formProps.style }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        overScrollMode='never'>
        {
          _.map(formProps.schema, (schemaValue, key) => {
            switch (schemaValue.type) {
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
              case FormType.Image:
                return <PepperImageInput
                  key={key}
                  onSubmit={(fieldOutput: { value: ImageItem[], valid: boolean }) => {
                    onFieldSubmit(key, fieldOutput, formProps.submitOnImageChange);
                  }}
                  {..._.omit(schemaValue as ImageInputSchema, 'type')}/>;
              case FormType.Menu:
                return <PepperMenuInput
                  key={key}
                  onSubmit={(fieldOutput: { value: MenuItem[], valid: boolean }) => { onFieldSubmit(key, fieldOutput); }}
                  {..._.omit(schemaValue as MenuInputSchema, 'type')}/>;
              case FormType.Tags:
                return <PepperTagsInput
                  key={key}
                  onSubmit={(fieldOutput: { value: string[], valid: boolean }) => { onFieldSubmit(key, fieldOutput); }}
                  {..._.omit(schemaValue as TagSchema, 'type')}/>;
              case FormType.SocialMedia:
                return <PepperSocialMediaInput
                  key={key}
                  onSubmit={(fieldOutput: { value: string, valid: boolean }) => { onFieldSubmit(key, fieldOutput); }}
                  {..._.omit(schemaValue as SocialMediaInputSchema, 'type')}/>;
              default:
                return <Text>Missing field</Text>;
            }
          })
        }
      </ScrollView>
      { _.isEmpty(_.filter(formErrors)) && changedAtLeastOnce ?
        <StaticValidateButton/> :
        null
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
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
  },
  validateButton: {
    flexDirection: 'row',
    borderRadius: 1 * space_unit,
    justifyContent: 'center',
  },
  validateButtonText: {
    color: indigo_3,
    paddingVertical: space_unit,
  },
});
