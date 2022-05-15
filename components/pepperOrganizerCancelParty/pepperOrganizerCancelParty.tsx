import React from 'react';
import {
  View, StyleSheet, Text, TouchableOpacity,
} from 'react-native';
import {
  white, space_unit, indigo_3, fontSizeRegular, raven, fontSizeBody,
} from '../../styles/common';
import { useNavigation } from '@react-navigation/native';
import { usePepperDispatch } from '../../hooks/store.hooks';
import { deleteParty } from '../../features/organizer/organizerActions';

const PepperOrganizerCancelParty = (newPartyProps: { route: { params: { partyId: number } } }): JSX.Element => {
  const storeDispatch = usePepperDispatch();

  // TODO: Library does not provide a type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: fontSizeBody }}>
        Are you sure you want to cancel this party?
      </Text>
      <TouchableOpacity style={styles.cancelButton} onPress={() => {
        storeDispatch(deleteParty({ partyId: newPartyProps.route.params.partyId })).then(() => {
          navigation.goBack();
        });
      }}>
        <Text style={styles.cancelText}>Cancel Party</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={() => {
        navigation.goBack();
      }}>
        <Text style={styles.cancelText}>Keep it on</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PepperOrganizerCancelParty;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    padding: 2 * space_unit,
    backgroundColor: indigo_3,
    width: '50%',
    borderRadius: 5,
    marginTop: 3 * space_unit,
  },
  cancelText: {
    textAlign: 'center',
    fontSize: fontSizeBody,
    color: white,
  },
  image: {
    height: '40%',
    marginBottom: 4 * space_unit,
  },
  description: {
    width: '90%',
    textAlign: 'center',
    fontSize: fontSizeRegular,
    color: raven,
  },
  headerContainer: {
    height: '70%',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
