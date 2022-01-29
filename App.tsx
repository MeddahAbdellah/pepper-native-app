import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PepperIntro from './components/pepperIntro/pepperIntro';
import PepperMain from './components/pepperMain/pepperMain';
import { PepperTitle, PepperMenu, PepperQrCode } from './components/pepperHeader/pepperHeader';
import PepperPartyDescription from './components/pepperPartyDescription/pepperPartyDescription';
import PepperUserDescription from './components/pepperUserDescription/pepperUserDescription';
import { Provider } from 'react-redux';
import store from './services/store';
import { PepperStackRoutes } from './models/routes';
import PepperTutorial from './components/pepperTutorial/pepperTutorial';
import PepperNewPartyForm from "./components/pepperNewPartyPage/pepperOrgenizerParty";
import {RootSiblingParent} from 'react-native-root-siblings';

const ReactStack = createNativeStackNavigator();

const PepperApp = (): JSX.Element => (
  <Provider store={store}>
    <RootSiblingParent>
      <NavigationContainer>

        <ReactStack.Navigator 
          screenOptions={{ 
            headerShadowVisible: false,
            gestureEnabled: false,
            headerBackVisible:false,
            headerTitle: () => (<PepperTitle/>),
            headerLeft: () => (<PepperMenu />),
            headerRight: () => (<PepperQrCode />),
          }}
        >
          <ReactStack.Screen name={PepperStackRoutes.Intro} component={PepperIntro} />
          <ReactStack.Screen name={PepperStackRoutes.OrganizerForms} component={PepperNewPartyForm} />
          <ReactStack.Screen name={PepperStackRoutes.Tutorial} component={PepperTutorial} />
          <ReactStack.Screen name={PepperStackRoutes.Main} component={PepperMain} />
          <ReactStack.Screen name={PepperStackRoutes.PartyDescription} component={PepperPartyDescription} />
          <ReactStack.Screen name={PepperStackRoutes.UserDescription} component={PepperUserDescription} />
        </ReactStack.Navigator>

      </NavigationContainer>
    </RootSiblingParent>
  </Provider>
);

export default PepperApp;
