import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootSiblingParent } from 'react-native-root-siblings';
import { Provider } from 'react-redux';
import store from '../services/store';
import { PepperTitle, PepperUserProfile, PepperQrCode } from '../components/pepperHeader/pepperHeader';
import { PepperStackRoutes } from '../models/routes';
import PepperLoginRouter from '../components/pepperLoginRouter/pepperLoginRouter';
import { white } from '../styles/common';
import PepperLandingPage from '../components/pepperLandingPage/pepperLandingPage';

const ReactStack = createNativeStackNavigator();

const PepperOrganizerApp = (): JSX.Element => (
  <RootSiblingParent>
    <Provider store={store}>
      <NavigationContainer>
        <ReactStack.Navigator
          screenOptions={({ route, navigation }) => ({
            headerShadowVisible: false,
            gestureEnabled: false,
            headerBackVisible: false,
            headerStyle: { backgroundColor: white },
            headerTitle: () => (<PepperTitle/>),
            headerLeft: () => (<PepperUserProfile navigation={navigation} route={route}/>),
            headerRight: () => (<PepperQrCode />),
          })}>
          <ReactStack.Screen name={PepperStackRoutes.LandingPage} component={PepperLandingPage} options={{ headerShown: false }}/>
          <ReactStack.Screen name={PepperStackRoutes.LoginRouter} component={PepperLoginRouter} />
        </ReactStack.Navigator>
      </NavigationContainer>
    </Provider>
  </RootSiblingParent>
);

export default PepperOrganizerApp;
