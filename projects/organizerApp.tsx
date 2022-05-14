import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootSiblingParent } from 'react-native-root-siblings';
import { Provider } from 'react-redux';
import store from '../services/store';
import { PepperTitle, PepperQrCode } from '../components/pepperHeader/pepperHeader';
import { PepperOrganizerStackRoutes } from '../models/routes';
import { white } from '../styles/common';
import PepperLandingPage from '../components/pepperLandingPage/pepperLandingPage';
import PepperOrganizerMain from '../components/pepperOrganizerMain/pepperOrganizerMain';
import PepperOrganizerLogin from '../components/pepperOrganizerLogin/pepperOrganizerLogin';
import PepperOrganizerSubscription from '../components/pepperOrganizerSubscription/pepperOrganizerSubscription';
import PepperOrganizerNewParty from '../components/pepperOrganizerNewParty/pepperOrganizerNewParty';

const ReactStack = createNativeStackNavigator();

const PepperOrganizerApp = (): JSX.Element => (
  <RootSiblingParent>
    <Provider store={store}>
      <NavigationContainer>
        <ReactStack.Navigator
          screenOptions={() => ({
            headerShadowVisible: false,
            gestureEnabled: false,
            headerBackVisible: false,
            headerStyle: { backgroundColor: white },
            headerTitle: () => (<PepperTitle/>),
            headerRight: () => (<PepperQrCode />),
          })}>
          <ReactStack.Screen name={PepperOrganizerStackRoutes.LandingPage} component={PepperLandingPage} options={{ headerShown: false }}/>
          <ReactStack.Screen name={PepperOrganizerStackRoutes.Login} component={PepperOrganizerLogin} />
          <ReactStack.Screen name={PepperOrganizerStackRoutes.Subscription} component={PepperOrganizerSubscription} />
          <ReactStack.Screen name={PepperOrganizerStackRoutes.Main} component={PepperOrganizerMain} />
          <ReactStack.Screen name={PepperOrganizerStackRoutes.NewParty} component={PepperOrganizerNewParty} />
        </ReactStack.Navigator>
      </NavigationContainer>
    </Provider>
  </RootSiblingParent>
);

export default PepperOrganizerApp;
