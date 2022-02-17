import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PepperParties from '../pepperParties/pepperParties';
import PepperIcon from '../pepperIcon/pepperIcon';
import { space_unit, grey_3, pepper } from '../../styles/common';
import PepperUserParties from '../pepperUserParties/pepperUserParties';
import PepperMatches from '../pepperMatches/pepperMatches';

const ReactTab = createBottomTabNavigator();

const renderIcon = (route: { name: string }, color: string): JSX.Element => <PepperIcon name={route.name} color={color} size={5 * space_unit} />;

const PepperMain = (): JSX.Element => <ReactTab.Navigator
  screenOptions={({ route }) => ({
    headerShown: false,
    tabBarShowLabel: false,
    tabBarInactiveTintColor: grey_3,
    tabBarActiveTintColor: pepper,
    tabBarIcon: ({ color }) => renderIcon(route, color),
  })}>
  <ReactTab.Screen name="pepper-chili" component={PepperParties} />
  <ReactTab.Screen name="pepper-disco" component={PepperUserParties} />
  <ReactTab.Screen name="pepper-couple" component={PepperMatches} />
</ReactTab.Navigator>;

export default PepperMain;
