import React, { useState } from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity,
} from 'react-native';
import {
  space_unit, grey_1, grey_2, pepper_2, grey_3, fontSizeRegular, color, indigo_3, fontSizeBody,
} from '../../styles/common';
import _ from 'lodash';
import { MenuInputSchema, MenuItem } from './formTypes';
import { sanitizeText } from '../../helpers/uiHelper';
import PepperIcon from '../pepperIcon/pepperIcon';

const MENU_ITEM_MAX_LENGTH = 15;
const MENU_PRICE_MAX_LENGTH = 3;


interface IMenuInput extends Omit<MenuInputSchema, 'type'> {
  onSubmit: (result: {value: MenuItem[], valid: boolean}) => void,
};

export const PepperMenuInput = (menuInputProps: IMenuInput): JSX.Element => {
  const [currentName, setCurrentName] = useState('');
  const [currentPrice, setCurrentPrice] = useState('');
  const [nameError, setNameError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const onNameChange = (value: string): void => {
    const sanitizedValue = sanitizeText(value);
    const validation = menuInputProps.nameValidator(sanitizedValue);
    setNameError(validation);
    setCurrentName(value);
  };

  const onPriceChange = (value: string): void => {
    const sanitizedValue = sanitizeText(value);
    const validation = menuInputProps.priceValidator(sanitizedValue);
    setPriceError(validation);
    setCurrentPrice(value);
  };

  const onAdd = (): void => {
    const filteredMenuItems = _.filter(menuItems, (item) => item.name !== currentName );
    const newMenuItems = [...filteredMenuItems, { name: currentName, price: currentPrice }];
    setMenuItems(newMenuItems);
    menuInputProps.onSubmit({ value: newMenuItems, valid: true });
    setCurrentName('');
    setCurrentPrice('');
  };

  const onRemove = (itemToRemove: MenuItem): void => {
    const newMenuItems = _.filter(menuItems, (item) => item.name !== itemToRemove.name );
    setMenuItems(newMenuItems);
    menuInputProps.onSubmit({ value: newMenuItems, valid: !_.isEmpty(newMenuItems) });
  };

  const isAddDisabled = (): boolean => (!_.isEmpty(priceError) || !_.isEmpty(nameError) || _.isEmpty(currentName) || _.isEmpty(currentPrice));

  return (
    <View style={styles.container}>
      {
        _.map(menuItems, (item) => (
          <View key={item.name} style={{
            flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: space_unit,
          }}>
            <Text>{item.name}</Text>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => onRemove(item)}>
              <Text style={{ marginRight: 3 * space_unit }}> {item.price}€ </Text>
              <PepperIcon name="pepper-close" size={2 * space_unit} color={grey_3}></PepperIcon>
            </TouchableOpacity>
          </View>
        ))
      }
      <View style={{
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: space_unit
      }}>
        <TextInput
          value={currentName}
          maxLength={MENU_ITEM_MAX_LENGTH}
          onChangeText={onNameChange}
          style={{
            ...styles.textInput,
            ...{ width: '70%' },
            ...(_.isEmpty(nameError) ? {} : { shadowColor: pepper_2 }),
          }}
          editable
        />
        <TextInput
          value={currentPrice}
          maxLength={MENU_PRICE_MAX_LENGTH}
          onChangeText={onPriceChange}
          style={{
            ...styles.textInput,
            ...{ width: '20%' },
            ...(_.isEmpty(priceError) ? {} : { shadowColor: pepper_2 }),
          }}
          editable
        />
        <Text style={{ fontSize: fontSizeBody, color: grey_3 }}>€</Text>
      </View>
      <TouchableOpacity
        onPress={onAdd}
        disabled={isAddDisabled()}>
        <Text style={{
          ...styles.addButton,
          ...(!isAddDisabled() ? { textDecorationLine: 'underline' } : {})
        }}> Add {menuInputProps.label}</Text>
      </TouchableOpacity>
      <Text style={styles.error}>{nameError}</Text>
      <Text style={styles.error}>{priceError}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  addButton: {
    fontSize: fontSizeRegular,
    marginVertical: 2 * space_unit,
    color: indigo_3,
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
