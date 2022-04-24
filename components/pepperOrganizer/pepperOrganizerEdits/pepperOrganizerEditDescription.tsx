import React, { useEffect, useState } from 'react';
import { usePepperOrganizer } from '../../../hooks/organizer.hooks';
import { usePepperDispatch } from '../../../hooks/store.hooks';
import {
  StyleSheet, View, Text,
} from 'react-native';
import {
  fire,
  fire_2,
  fontSizeSubSubHeader,
  indigo, pepper, raven, space_unit, white,
} from '../../../styles/common';
import PepperRoundButton from '../../pepperRoundButton/pepperRoundButton';
import { alwaysValidValidator, PepperTextInput } from '../../pepperForm';
import { updateOrganizer } from '../../../features/organizer/organizerActions';



export const PepperOrganizerEditDescription = (): JSX.Element => {

  const organizer = usePepperOrganizer();
  const storeDispatch = usePepperDispatch();

  const [editEnable, setEditEnabled] = useState(false);
  const [description, setDescription] = useState('');

  useEffect(() => {
    setDescription(organizer.organizer.description);
  }, [organizer.organizer.description]);

  return ( <View style={styles.container}>
    <View style={styles.headerContainer}>
      { !editEnable ?
        <Text style={styles.description}>{description}</Text> :
        null}
      { editEnable ?
        <View style={{ flex: 7, marginRight: space_unit * 2 }}>
          <PepperTextInput multiline={true} initialValue={description} label='Description of the Establishment' max={80}
            validator={alwaysValidValidator} onSubmit={(result: { value: string}) => {
              setDescription(result.value);
            }} />
        </View> :
        null}
      <View style={{ flex: 1, marginTop: space_unit * 2 }}>
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
            if (description != organizer.organizer.description) {
              storeDispatch(updateOrganizer({ description }));
            }
            setEditEnabled(false);
          }}/>
      </View>
    </View>
  </View>);
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
    alignItems: 'flex-start',
    paddingTop: space_unit,
    paddingBottom: space_unit,
  },
  editButton: {
    zIndex: 4,
    shadowColor: white,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: .3,
    shadowRadius: 3,
    elevation: 2,
  },
  description: {
    fontSize: fontSizeSubSubHeader,
    flex: 7,
    color: raven,
    width: '100%',
    marginVertical: 2 * space_unit,

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
