import React, { useEffect, useState } from 'react';
import { usePepperOrganizer } from '../../../hooks/organizer.hooks';
import { MenuItem, nameValidator, priceValidator } from '../../pepperForm';
import { PepperMenuInput } from '../../pepperForm/pepperMenuInput';
import { usePepperDispatch } from '../../../hooks/store.hooks';
import { StyleSheet, View, Text } from 'react-native';
import {
  fire,
  fire_2,
  fontSizeHeader,
  indigo, pepper, raven, space_unit, white,
} from '../../../styles/common';
import PepperRoundButton from '../../pepperRoundButton/pepperRoundButton';
import { keyExtractor } from '../../../helpers/uiHelper';
import { updateOrganizer } from '../../../features/organizer/organizerActions';

const StaticMenuList = (items: Array<{ name: string, price: number }>): JSX.Element[] => items.map((item) => (
  <View key={keyExtractor(item.name)} style={styles.menuDescription}>
    <Text>{item.name}</Text>
    <Text>{`${item.price}€`}</Text>
  </View>
));

export const PepperOrganizerEditFoods = (): JSX.Element => {

  const organizer = usePepperOrganizer();
  const storeDispatch = usePepperDispatch();

  const [editEnable, setEditEnabled] = useState(false);
  const [foodsList, setFoodList] = useState<Array<{name: string, price: number }>>(Array<{name: string, price: number }>());

  useEffect(() => {
    setFoodList(organizer.organizer.foods);
  }, [organizer.organizer.foods]);

  return ( <View style={styles.container}>
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>{'Foods '}</Text>
      <PepperRoundButton
        size={6 * space_unit}
        style={styles.editButton}
        colors={ editEnable ? [fire, fire_2] : [indigo, pepper]}
        iconName={editEnable ? 'pepper-arrowRight' : 'pepper-pencil'}
        onPress={() => {
          if (!editEnable) {
            setEditEnabled(true);
            return;
          }
          if (JSON.stringify(organizer.organizer.foods) !== JSON.stringify(foodsList)) {
            storeDispatch(updateOrganizer({ foods: foodsList }));
          }
          setEditEnabled(false);
        }}/>
    </View>
    <View style={{ width: '100%' }}>
      { editEnable ?
        <PepperMenuInput label={'Foods'}
          nameValidator={nameValidator} priceValidator={priceValidator}
          initialValue={foodAndDrinksStringConverter(foodsList)}
          onSubmit={(result: { value: MenuItem[]}) => {
            // eslint-disable-next-line no-console
            setFoodList(foodAndDrinksParser(result.value));
          } }></PepperMenuInput> :
        null}
      { !editEnable ?
        <View style={styles.menuDescriptionHolder}>
          {StaticMenuList(organizer.organizer.foods)}
        </View> :
        null}
    </View>
  </View>);
};



const foodAndDrinksStringConverter = (input: Array<{name: string, price: number }>): MenuItem[] => {
  let list: MenuItem[] = [];
  input.forEach((i) => {
    list.push( { name: i.name.toString(), price: i.price.toString() });
  });
  return list;
};
const foodAndDrinksParser = (input: MenuItem[]): Array<{name: string, price: number }> => {
  let list: Array<{name: string, price: number }> = [];
  input.forEach((i) => {
    list.push( { name: i.name.toString(), price: Number(i.price) });
  });
  return list;
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingTop: space_unit,
    paddingBottom: 4 * space_unit,
    width: '100%'
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: space_unit,
    paddingBottom: space_unit,
  },
  editButton: {
    zIndex: 4,
    top: 0,
    left: 0,
    shadowColor: white,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: .3,
    shadowRadius: 3,
    elevation: 2,
  },
  headerText: {
    fontSize: fontSizeHeader,
  },
  menuDescriptionHolder: {
    width: '100%',
    paddingHorizontal: 2 * space_unit,
    marginTop: space_unit,
  },
  menuDescription: {
    marginTop: .5 * space_unit,
    paddingHorizontal: space_unit,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: raven,
  },
});
