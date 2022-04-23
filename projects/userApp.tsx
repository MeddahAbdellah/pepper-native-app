import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootSiblingParent } from 'react-native-root-siblings';
import { Provider } from 'react-redux';
import store from '../services/store';
import { PepperTitle, PepperUserProfile, PepperQrCode } from '../components/pepperHeader/pepperHeader';
import { PepperStackRoutes } from '../models/routes';
import PepperIntro from '../components/pepperIntro/pepperIntro';
import PepperUserSubscription from '../components/pepperUserSubscription/pepperUserSubscription';
import PepperTutorial from '../components/pepperTutorial/pepperTutorial';
import PepperMain from '../components/pepperMain/pepperMain';
import PepperMatchDescription from '../components/pepperMatchDescription/pepperMatchDescription';
import PepperUserCodeLogin from '../components/pepperUserCodeLogin/pepperUserCodeLogin';
import PepperLoginRouter from '../components/pepperLoginRouter/pepperLoginRouter';
import PepperUserDescription from '../components/pepperUserDescription/pepperUserDescription';
import { white } from '../styles/common';
import PepperLandingPage from '../components/pepperLandingPage/pepperLandingPage';
import PepperPartyDetails from '../components/pepperPartyDetails/pepperPartyDetails';
import PepperPartyDescription from '../components/pepperPartyDescription/pepperPartyDescription';

const ReactStack = createNativeStackNavigator();

const PepperUserApp = (): JSX.Element => (
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
          <ReactStack.Screen name={PepperStackRoutes.CodeLogin} component={PepperUserCodeLogin} />
          <ReactStack.Screen name={PepperStackRoutes.Intro} component={PepperIntro} />
          <ReactStack.Screen name={PepperStackRoutes.Subscription} component={PepperUserSubscription} />
          <ReactStack.Screen name={PepperStackRoutes.Tutorial} component={PepperTutorial} />
          <ReactStack.Screen name={PepperStackRoutes.Main} component={PepperMain} />
          <ReactStack.Screen name={PepperStackRoutes.PartyDescription} component={PepperPartyDescription} />
          <ReactStack.Screen name={PepperStackRoutes.PartyDetails} component={PepperPartyDetails} />
          <ReactStack.Screen name={PepperStackRoutes.MatchDescription} component={PepperMatchDescription} />
          <ReactStack.Screen name={PepperStackRoutes.UserDescription} component={PepperUserDescription} />
        </ReactStack.Navigator>
      </NavigationContainer>
    </Provider>
  </RootSiblingParent>
);

export default PepperUserApp;
