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
import pepperNewPartyForm from "./components/pepperNewPartyPage/pepperOrgenizerParty";
import {RootSiblingParent} from 'react-native-root-siblings';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <RootSiblingParent>
      <NavigationContainer>

        <Stack.Navigator 
          screenOptions={{ 
            headerShadowVisible: false,
            gestureEnabled: false,
            headerBackVisible:false,
            headerTitle: () => (<PepperTitle/>),
            headerLeft: () => (<PepperMenu />),
            headerRight: () => (<PepperQrCode />),
          }}
          >
          <Stack.Screen name={PepperStackRoutes.Intro} component={PepperIntro} />
          <Stack.Screen name={PepperStackRoutes.OrganizerForms} component={pepperNewPartyForm} />
          <Stack.Screen name={PepperStackRoutes.Tutorial} component={PepperTutorial} />
          <Stack.Screen name={PepperStackRoutes.Main} component={PepperMain} />
          <Stack.Screen name={PepperStackRoutes.PartyDescription} component={PepperPartyDescription} />
          <Stack.Screen name={PepperStackRoutes.UserDescription} component={PepperUserDescription} />
        </Stack.Navigator>

      </NavigationContainer>
      </RootSiblingParent>
    </Provider>
  );
}
