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

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
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
          <Stack.Screen name="Intro" component={PepperIntro} />
          <Stack.Screen name="Main" component={PepperMain} />
          <Stack.Screen name="PartyDescription" component={PepperPartyDescription} />
          <Stack.Screen name="UserDescription" component={PepperUserDescription} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
