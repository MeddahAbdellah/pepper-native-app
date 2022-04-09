import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootSiblingParent } from 'react-native-root-siblings';
import { Provider } from 'react-redux';
import store from '../services/store';
import { PepperTitle, PepperUserProfile, PepperQrCode } from '../components/pepperHeader/pepperHeader';
import { PepperStackRoutes } from '../models/routes';
import { white } from '../styles/common';
import PepperLandingPage from '../components/pepperLandingPage/pepperLandingPage';
import PepperOrganizerIntro from '../components/pepperOrganizer/pepperOrganizerLanding';
import PepperOrganizerSubscribe from '../components/pepperOrganizer/pepperOgranizerSubscription';
import PepperOrganizerMain from '../components/pepperOrganizer/pepperOrganizerMain';
import PepperOrganizerLogin from '../components/pepperOrganizer/pepperOrganizerLogin';

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
          <ReactStack.Screen name={PepperStackRoutes.Intro} component={PepperOrganizerIntro} />
          <ReactStack.Screen name={PepperStackRoutes.Subscription} component={PepperOrganizerSubscribe} />
          <ReactStack.Screen name={PepperStackRoutes.LoginRouter} component={PepperOrganizerLogin} />
          <ReactStack.Screen name={PepperStackRoutes.Main} component={PepperOrganizerMain} />
        </ReactStack.Navigator>
      </NavigationContainer>
    </Provider>
  </RootSiblingParent>
);

export default PepperOrganizerApp;
