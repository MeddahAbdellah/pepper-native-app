import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PepperParties from '../pepperParties/pepperParties';
import PepperIcon from '../pepperIcon/pepperIcon';
import { space_unit, grey_3, pepper } from '../../styles/common';
import PepperUserParties from '../pepperUserParties/pepperUserParties';
import PepperMatches from '../pepperMatches/pepperMatches';

const Tab = createBottomTabNavigator();

const renderIcon = (route: { name: string }, color: string) => {
  return <PepperIcon name={route.name} color={color} size={5 * space_unit} />;
};

export default function PepperMain() {
  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({ 
        headerShown: false,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: grey_3,
        tabBarActiveTintColor: pepper,
        tabBarIcon: ({ color }) => renderIcon(route, color),
      })}>
      <Tab.Screen name="pepper-chili" component={PepperParties} />
      <Tab.Screen name="pepper-disco" component={PepperUserParties} />
      <Tab.Screen name="pepper-couple" component={PepperMatches} />
    </Tab.Navigator>
  );
}