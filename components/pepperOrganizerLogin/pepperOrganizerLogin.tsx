import React, { useState } from 'react';
import LoginService from '../../services/login';
import { useNavigation } from '@react-navigation/native';
import { PepperOrganizerStackRoutes } from '../../models/routes';
import {
  PepperForm, FormType, FormSchema, MenuItem, freeNameValidator, passwordValidator,
} from '../pepperForm';
import {
  TouchableOpacity, Text, StyleSheet, Modal, View,
} from 'react-native';
import {
  space_unit, fontSizeRegular, indigo_3, pepper_2, fontSizeBody, black, white,
} from '../../styles/common';
import { HttpStatus } from '../../services/api';
import { BlurView } from 'expo-blur';
import PepperImage, { PepperImages } from '../pepperImage/pepperImage';

const PepperOrganizerLogin = (): JSX.Element => {
  // TODO: Library does not provide a type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigation = useNavigation<any>();
  const [error, setError] = useState<string>('');
  const schema: FormSchema = {
    userName: {
      type: FormType.Text,
      label: 'Enter your user name',
      max: 20,
      validator: freeNameValidator,
    },
    password: {
      type: FormType.Text,
      label: 'Enter your password',
      isPassword: true,
      max: 20,
      validator: passwordValidator,
    },
  };

  const StaticErrorModal = (): JSX.Element => (
    <Modal
      animationType="fade"
      visible={!!error}
      transparent={true}>
      <BlurView tint="dark" style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <PepperImage src={PepperImages.Sir} style={styles.modalImage}></PepperImage>
          <Text style={styles.errorText}>
            {error}
          </Text>
          <TouchableOpacity onPress={() => setError('')}>
            <Text style={{ fontSize: fontSizeBody }}>Okey</Text>
          </TouchableOpacity>
        </View>
      </BlurView>
    </Modal>
  );

  // FIX: fix typing
  const onSubmit = async(output: { [key: string]: string | MenuItem[] | string[] }): Promise<void> => {
    const { userName, password } = output;
    try {
      const isLoggedIn = await LoginService.organizerLogin(userName as string, password as string);
      if (isLoggedIn) {
        navigation.navigate(PepperOrganizerStackRoutes.Main);
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.status === HttpStatus.UNAUTHORIZED) {
        setError('This user is not authorized to create parties for now, please contact the support at +33 7 69 23 86 22');
      } else if (error.status === HttpStatus.NOT_FOUND) {
        setError('User name or password is incorrect');
      }
    }
  };

  return (<>
    <StaticErrorModal/>
    <PepperForm schema={schema} onSubmit={onSubmit}/>
    <TouchableOpacity style={styles.subscribeButton} onPress={() => { navigation.navigate(PepperOrganizerStackRoutes.Subscription); }}>
      <Text style={styles.subscribeText}>Don't have an account? Subscribe!</Text>
    </TouchableOpacity>
  </>
  );
};

export default PepperOrganizerLogin;


const styles = StyleSheet.create({
  subscribeButton: {
    position: 'absolute',
    bottom: 5 * space_unit,
    left: 3 * space_unit,
    zIndex: 2,
  },
  subscribeText: {
    fontSize: fontSizeRegular,
    color: indigo_3,
    textDecorationLine: 'underline'
  },
  errorText: {
    fontSize: fontSizeBody,
    margin: 2 * space_unit,
    color: pepper_2,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '95%',
    backgroundColor: white,
    borderRadius: 2 * space_unit,
    padding: 3 * space_unit,
    alignItems: 'center',
    textAlign: 'center',
    shadowColor: black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalImage: {
    height: 22 * space_unit,
  },
});
