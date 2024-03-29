import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity,
} from 'react-native';
import {
  space_unit, grey_3, fontSizeRegular, indigo_3, fontSizeBody, indigo,
} from '../../styles/common';
import _ from 'lodash';
import { MenuInputSchema, MenuItem } from './formTypes';
import { sanitizeText } from '../../helpers/uiHelper';
import PepperIcon from '../pepperIcon/pepperIcon';
import { inputStyle, inputErrorStyle } from './style';

const MENU_ITEM_MAX_LENGTH = 15;
const MENU_PRICE_MAX_LENGTH = 3;


interface IMenuInput extends Omit<MenuInputSchema, 'type'> {
  onSubmit: (result: {value: MenuItem[], valid: boolean}) => void,
};

export const PepperMenuInput = (menuInputProps: IMenuInput): JSX.Element => {
  const [currentName, setCurrentName] = useState('');
  const [currentPrice, setCurrentPrice] = useState(0);
  const [nameError, setNameError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    if (menuInputProps.initialValue) {
      setMenuItems(menuInputProps.initialValue);
    }
  }, [menuInputProps.initialValue]);

  const onNameChange = (value: string): void => {
    const sanitizedValue = sanitizeText(value);
    const validation = menuInputProps.nameValidator(sanitizedValue);
    setNameError(validation);
    setCurrentName(value);
  };

  const onPriceChange = (value: string): void => {
    const sanitizedValue = sanitizeText(value);
    const validation = menuInputProps.priceValidator(Number(sanitizedValue).toString());
    setPriceError(validation);
    setCurrentPrice(Number(value) || 0);
  };

  const onAdd = (): void => {
    const filteredMenuItems = _.filter(menuItems, (item) => item.name !== currentName );
    const newMenuItems = [...filteredMenuItems, { name: currentName, price: currentPrice }];
    setMenuItems(newMenuItems);
    menuInputProps.onSubmit({ value: newMenuItems, valid: true });
    setCurrentName('');
    setCurrentPrice(0);
  };

  const onRemove = (itemToRemove: MenuItem): void => {
    const newMenuItems = _.filter(menuItems, (item) => item.name !== itemToRemove.name );
    setMenuItems(newMenuItems);
    menuInputProps.onSubmit({ value: newMenuItems, valid: !_.isEmpty(newMenuItems) });
  };

  const isAddDisabled = (): boolean => (
    !_.isEmpty(priceError) ||
    !_.isEmpty(nameError) ||
    _.isEmpty(currentName) ||
    _.isEmpty(currentPrice.toString()));

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
            ...(_.isEmpty(nameError) ? {} : { shadowColor: indigo }),
          }}
          editable
        />
        <TextInput
          value={currentPrice.toString()}
          maxLength={MENU_PRICE_MAX_LENGTH}
          onChangeText={onPriceChange}
          style={{
            ...styles.textInput,
            ...{ width: '20%' },
            ...(_.isEmpty(priceError) ? {} : { shadowColor: indigo }),
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
  error: inputErrorStyle,
  textInput: inputStyle
});
