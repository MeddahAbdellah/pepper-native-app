import React, { useState } from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity,
} from 'react-native';
import {
  space_unit, grey_3, fontSizeRegular, indigo_3, fontSizeBody, indigo, color, fontSizeSubHeader,
  grey_1, indigo_2, fire, fire_2, sun, sun_2, pepper_2, pepper,
} from '../../styles/common';
import _ from 'lodash';
import { TagSchema } from './formTypes';
import { sanitizeText } from '../../helpers/uiHelper';
import PepperIcon from '../pepperIcon/pepperIcon';
import { inputErrorStyle } from './style';
import PepperTag from '../pepperTags/pepperTags';

const TAG_MAX_LENGTH = 15;
const MAX_TAGS_NUMBER = 9;

interface ITagInput extends Omit<TagSchema, 'type'> {
  onSubmit: (result: {value: string[], valid: boolean}) => void,
};

export const PepperTagsInput = (tagInputProps: ITagInput): JSX.Element => {
  const [currentTag, setCurrentTag] = useState('');
  const [tagError, setTagError] = useState('');
  const [tagItems, setTagsItems] = useState<string[]>([]);

  const onTagChange = (value: string): void => {
    const sanitizedValue = sanitizeText(value);
    const validation = tagInputProps.validator(sanitizedValue);
    setTagError(validation);
    setCurrentTag(value);
  };

  const onAdd = (): void => {
    if (tagError === '') {
      const filteredMenuItems = _.filter(tagItems, (item) => item !== currentTag );
      const newTagsItems = [...filteredMenuItems, currentTag];
      setTagsItems(newTagsItems);
      tagInputProps.onSubmit({ value: newTagsItems, valid: true });
      setCurrentTag('');
    }
  };

  const onRemove = (itemToRemove: string): void => {
    const newMenuItems = _.filter(tagItems, (item) => item !== itemToRemove );
    setTagsItems(newMenuItems);
    tagInputProps.onSubmit({ value: newMenuItems, valid: !_.isEmpty(newMenuItems) });
  };

  const StaticTagsDisplay = (interest: string, index: number): JSX.Element => {
    const tagColors = [[sun, sun_2], [fire, fire_2], [indigo, indigo_2], [pepper, pepper_2]];
    return (<PepperTag
      text={interest}
      // Randomly selected colors
      firstGradientColor={tagColors[index % tagColors.length][0]}
      secondGradientColor={tagColors[index % tagColors.length][1]}
      style={styles.tags}/>);
  }
  ;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{tagInputProps.label}</Text>
      <View style={styles.tagHolder}>
        <TextInput
          value={currentTag}
          maxLength={TAG_MAX_LENGTH}
          onChangeText={onTagChange}
          style={{
            ...styles.textInput,
            ...{ width: '80%' },
            ...(_.isEmpty(tagError) ? {} : { shadowColor: indigo }),
          }}
          editable
        />
        { (tagItems.length < MAX_TAGS_NUMBER) ?
          <TouchableOpacity style={{ width: '15%' }}
            onPress={onAdd}>
            <PepperIcon name='pepper-add' size={6 * space_unit} color={color(indigo, .8)} />
          </TouchableOpacity> :
          null}
      </View>
      <Text style={styles.error}>{tagError}</Text>

      <View style={styles.displayedTagsHolder}>
        {
          _.map(tagItems, (item, index) => (
            <View key={item} style={{
              flexDirection: 'row', alignItems: 'center', marginVertical: space_unit,
            }}>
              {StaticTagsDisplay(item, index)}
              <TouchableOpacity style={styles.tagDelete} onPress={() => onRemove(item)}>
                <PepperIcon name="pepper-close" size={2 * space_unit} color={grey_3}></PepperIcon>
              </TouchableOpacity>
            </View>
          ))
        }
      </View>
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
  addButton: {
    fontSize: fontSizeRegular,
    marginVertical: 2 * space_unit,
    color: indigo_3,
  },
  error: inputErrorStyle,
  textInput: {
    padding: 2 * space_unit,
    fontSize: fontSizeSubHeader,
    color: color(grey_3, .9),
    backgroundColor: color(grey_1, .4),
    borderRadius: space_unit,
  },
  tagDelete: {
    flexDirection: 'row',
    alignItems: 'center',
    marginEnd: 2 * space_unit,
    paddingBottom: .8 * space_unit
  },
  tags: {
    marginBottom: 1 * space_unit,
    marginRight: .5 * space_unit,
    shadowColor: color(grey_3, .3),
  },
  tagHolder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: space_unit
  },
  displayedTagsHolder: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: space_unit,
    flexWrap: 'wrap'
  }
});


