import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootSiblingParent } from 'react-native-root-siblings';
import { Provider } from 'react-redux';
import store from '../services/store';
import { PepperTitle, PepperMenu, PepperQrCode } from '../components/pepperHeader/pepperHeader';
import { PepperStackRoutes } from '../models/routes';
import PepperIntro from '../components/pepperIntro/pepperIntro';
import PepperUserSubscription from '../components/pepperUserSubscription/pepperUserSubscription';
import PepperTutorial from '../components/pepperTutorial/pepperTutorial';
import PepperMain from '../components/pepperMain/pepperMain';
import PepperPartyDescription from '../components/pepperPartyDescription/pepperPartyDescription';
import PepperUserDescription from '../components/pepperUserDescription/pepperUserDescription';
import PepperUserCodeLogin from '../components/pepperUserCodeLogin/pepperUserCodeLogin';
import PepperLoginRouter from '../components/pepperLoginRouter/pepperLoginRouter';

const ReactStack = createNativeStackNavigator();

const PepperUserApp = (): JSX.Element => (
  <RootSiblingParent>
    <Provider store={store}>
      <NavigationContainer>
        <ReactStack.Navigator
          screenOptions={{
            headerShadowVisible: false,
            gestureEnabled: false,
            headerBackVisible: false,
            headerTitle: () => (<PepperTitle/>),
            headerLeft: () => (<PepperMenu />),
            headerRight: () => (<PepperQrCode />),
          }}>
          <ReactStack.Screen name={PepperStackRoutes.LoginRouter} component={PepperLoginRouter} />
          <ReactStack.Screen name={PepperStackRoutes.CodeLogin} component={PepperUserCodeLogin} />
          <ReactStack.Screen name={PepperStackRoutes.Intro} component={PepperIntro} />
          <ReactStack.Screen name={PepperStackRoutes.Subscription} component={PepperUserSubscription} />
          <ReactStack.Screen name={PepperStackRoutes.Tutorial} component={PepperTutorial} />
          <ReactStack.Screen name={PepperStackRoutes.Main} component={PepperMain} />
          <ReactStack.Screen name={PepperStackRoutes.PartyDescription} component={PepperPartyDescription} />
          <ReactStack.Screen name={PepperStackRoutes.UserDescription} component={PepperUserDescription} />
        </ReactStack.Navigator>
      </NavigationContainer>
    </Provider>
  </RootSiblingParent>
);

export default PepperUserApp;
