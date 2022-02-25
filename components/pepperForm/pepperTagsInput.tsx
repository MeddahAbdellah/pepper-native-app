import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity,
} from 'react-native';
import {
  space_unit, grey_3, fontSizeRegular, indigo_3, fontSizeBody, indigo, color, fontSizeSubHeader,
  grey_1, indigo_2, fire, fire_2, sun, sun_2, pepper_2, pepper, white,
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

  useEffect(() => {
    setTagsItems(tagInputProps.initialValue || []);
  }, [tagInputProps.initialValue]);

  const onTagChange = (value: string): void => {
    const sanitizedValue = sanitizeText(value);
    const validation = tagInputProps.validator(sanitizedValue);
    setTagError(validation);
    setCurrentTag(value);
  };

  const onAdd = (): void => {
    if (tagError === '' && currentTag !== '') {
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
    return (<>
      <PepperTag
        text={interest}
        firstGradientColor={tagColors[index % tagColors.length][0]}
        secondGradientColor={tagColors[index % tagColors.length][1]}
        style={styles.tags}
        iconComponent={<TouchableOpacity style={styles.tagDelete} onPress={() => onRemove(interest)}>
          <PepperIcon name="pepper-close" size={2 * space_unit} color={white}></PepperIcon>
        </TouchableOpacity>}
      />

    </>);
  }
  ;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{tagInputProps.label}</Text>

      { (tagItems.length < MAX_TAGS_NUMBER) ?
        <View style={styles.tagHolder}>
          <TextInput
            value={currentTag}
            maxLength={TAG_MAX_LENGTH}
            onChangeText={onTagChange}
            style={{
              ...styles.textInput,
              ...{ flex: 1 },
              ...(_.isEmpty(tagError) ? {} : { shadowColor: indigo }),
            }}
            editable
          />

          <TouchableOpacity onPress={onAdd} style={{ marginLeft: 2.5 * space_unit, marginRight: 1 * space_unit }}>
            <PepperIcon name='pepper-add' size={5 * space_unit} color={color(indigo, .8)} />
          </TouchableOpacity>
        </View> :
        <Text style={styles.error}>{'You have reached the maximum number of interests'}</Text>}
      <Text style={styles.error}>{tagError}</Text>

      <View style={styles.displayedTagsHolder}>
        {
          _.map(tagItems, (item, index) => (
            <View key={item} style={{
              flexDirection: 'row', alignItems: 'center',
            }}>
              {StaticTagsDisplay(item, index)}
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
    marginLeft: 1 * space_unit,
    marginRight: .2 * space_unit,
    padding: .5 * space_unit
  },
  tags: {
    marginBottom: 1 * space_unit,
    marginRight: 1.5 * space_unit,
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


