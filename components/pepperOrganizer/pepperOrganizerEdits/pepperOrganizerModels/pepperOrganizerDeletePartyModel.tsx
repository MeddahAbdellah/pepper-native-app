import React from 'react';
import {

  Button,
  ScrollView,
  StyleSheet, TouchableOpacity, View, Text,
} from 'react-native';
import { IParty } from '../../../../models/types';
import {

  fontSizeRegular,
  fontSizeSubHeader,
  indigo_3,
  space_unit,
} from '../../../../styles/common';



export const PepperOrganizerdeletePartyModel = (modelProps: {partyInfo: IParty, onGoBack: () => void,
   onDelete: (partyId: number) => void}): JSX.Element => ( <ScrollView style={styles.container}>
  <TouchableOpacity style={styles.loginButton} onPress={() => { modelProps.onGoBack(); }}>
    <Text style={styles.loginText}>Go Back ?</Text>
  </TouchableOpacity>

  <View style={{ flex: 1, width: '100%' }}>


    <Text style={{ fontSize: fontSizeRegular, alignSelf: 'center' }}>{'Theme'}</Text>
    <Text style={{ fontSize: fontSizeSubHeader, paddingBottom: 2 * space_unit }}>{modelProps.partyInfo.theme}</Text>

    <Text style={{ fontSize: fontSizeRegular, alignSelf: 'center' }}>{'Date'}</Text>
    <Text style={{ fontSize: fontSizeSubHeader, paddingBottom: 2 * space_unit }}>{modelProps.partyInfo.date.split('T')[0]}</Text>

    <Text style={{ fontSize: fontSizeRegular, alignSelf: 'center' }}>{'Expected Attandance'}</Text>
    <Text style={{ fontSize: fontSizeSubHeader, paddingBottom: 2 * space_unit }}>{modelProps.partyInfo.people}</Text>

    <Text style={{ fontSize: fontSizeRegular, alignSelf: 'center' }}>{'Attendance Age'}</Text>
    <Text style={{ fontSize: fontSizeSubHeader, paddingBottom: 2 * space_unit }}>
      {modelProps.partyInfo.minAge + ' - ' + modelProps.partyInfo.minAge}</Text>

    <Text style={{ fontSize: fontSizeRegular, alignSelf: 'center' }}>{'Entrance Price'}</Text>
    <Text style={{ fontSize: fontSizeSubHeader, paddingBottom: 2 * space_unit }}>{modelProps.partyInfo.price + ' euro'}</Text>
  </View>

  <Button title="Delete This Party" onPress={ async() => {
    modelProps.onDelete(modelProps.partyInfo.id);
    modelProps.onGoBack();
  }}/>



</ScrollView>);


const styles = StyleSheet.create({
  container: {
    width: '90%',
  },
  loginButton: {
    zIndex: 2,
    alignSelf: 'flex-end'
  },
  loginText: {
    fontSize: fontSizeRegular,
    color: indigo_3,
    textDecorationLine: 'underline'
  }
});
