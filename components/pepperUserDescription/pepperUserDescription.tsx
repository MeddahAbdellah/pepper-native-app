import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, ScrollView, TouchableOpacity,
} from 'react-native';
import {
  white, space_unit, fontSizeHeader, pepper,
} from '../../styles/common';
import LoginService from '../../services/login';
import { usePepperDispatch } from '../../hooks/store.hooks';
import { fetchUser, resetUser, updateUser } from '../../features/user/userActions';
import { usePepperUser } from '../../hooks/user.hooks';
import { useNavigation } from '@react-navigation/native';
import { PepperStackRoutes } from '../../models/routes';
import {
  FormSchema, PepperForm, FormType, nameValidator, cityValidator, alwaysValidValidator, MenuItem, tagValidator,
} from '../pepperForm';

const PepperUserDescription = (): JSX.Element => {
  const [schema, setSchema] = useState<FormSchema>({});
  const storeDispatch = usePepperDispatch();
  // Fetch user on load
  useEffect(() => { storeDispatch(fetchUser()); }, []);
  const currentUser = usePepperUser();
  useEffect(() => {
    if (!currentUser.user) { return; }
    setSchema({
      imgs: {
        type: FormType.Image,
        initialValue: currentUser.user.imgs,
      },
      interests: {
        type: FormType.Tags,
        label: 'You & your hobbies',
        initialValue: currentUser.user.interests,
        validator: tagValidator,
      },
      job: {
        type: FormType.Text,
        label: 'Job',
        initialValue: currentUser.user.job,
        max: 20,
        validator: nameValidator,
      },
      address: {
        type: FormType.Text,
        label: 'Ville',
        initialValue: currentUser.user.address,
        max: 30,
        validator: cityValidator,
      },
      description: {
        type: FormType.Text,
        label: 'Description',
        initialValue: currentUser.user.description,
        multiline: true,
        max: 200,
        validator: alwaysValidValidator,
      }
    });
  }, [currentUser]);

  // TODO: Library does not provide a type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigation = useNavigation<any>();

  const updatePersonalInfo = (result: { [key: string]: string | MenuItem[] | string[]; }): void => {
    storeDispatch(updateUser(result));
  };

  return (
    <ScrollView style={{ backgroundColor: white }}>
      <View style={styles.container}>
        <View style={styles.detailsContainer}>
          <Text style={{ fontSize: fontSizeHeader }}>{currentUser.user.name}</Text>
          <PepperForm
            schema={schema}
            onSubmit={updatePersonalInfo}
            style={{ padding: 0, marginTop: 2 * space_unit }}
            hasUpdateButton={true}
            submitOnImageChange={true}></PepperForm>
        </View>
        <TouchableOpacity style={styles.logoutButton}
          onPress={async() => {
            await LoginService.logout();
            storeDispatch(resetUser());
            navigation.navigate(PepperStackRoutes.LandingPage);
          }}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default PepperUserDescription;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: space_unit,
    paddingBottom: 4 * space_unit,
  },
  detailsContainer: {
    width: '100%',
    paddingHorizontal: 2 * space_unit,
    marginTop: space_unit,
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
