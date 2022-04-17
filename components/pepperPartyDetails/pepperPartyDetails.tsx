import React from 'react';
import { IParty } from '../../models/types';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PepperPartyDescription from '../pepperPartyDescription/pepperPartyDescription';
import PepperPartyAttendees from '../pepperPartyAttendees/pepperPartyAttendees';
import {
  color, grey_3, indigo, white,
} from '../../styles/common';

const StaticPartyTabs = createMaterialTopTabNavigator();

const PepperPartyDetails = (detailsProps: { route: { params: { party: IParty } }}): JSX.Element => (
  <StaticPartyTabs.Navigator
    screenOptions={{
      tabBarActiveTintColor: indigo,
      tabBarInactiveTintColor: color(grey_3, .6),
      tabBarStyle: { backgroundColor: white },
      tabBarIndicatorStyle: { backgroundColor: indigo },
      swipeEnabled: false,
    }}
  >
    <StaticPartyTabs.Screen
      initialParams={{ party: detailsProps.route.params.party, canCancel: true }}
      name="Description" component={PepperPartyDescription} />
    <StaticPartyTabs.Screen
      initialParams={{ party: detailsProps.route.params.party }}
      name="People" component={PepperPartyAttendees} />
  </StaticPartyTabs.Navigator>
);


export default PepperPartyDetails;

