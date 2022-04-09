import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity,
} from 'react-native';
import { PepperStackRoutes } from '../../models/routes';
import LoginService from '../../services/login';
import { pepper, space_unit, white } from '../../styles/common';



const PepperOrganizerMain = (): JSX.Element => {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton}
        onPress={async() => {
          await LoginService.logout();
          navigation.navigate(PepperStackRoutes.LandingPage);
        }}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity></View>
  );
};


export default PepperOrganizerMain;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: pepper,
    marginTop: 6 * space_unit,
    borderRadius: 1 * space_unit,
  },
  logoutButtonText: {
    width: '80%',
    textAlign: 'center',
    color: white,
    paddingVertical: 2 * space_unit,
  },
});
