import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AvailableShifts from '../Screens/AvailableShifts';
import MyShifts from '../Screens/MyShifts';
import TopTabNavigator from './TopBarNavigator';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="My Shifts"
      screenOptions={{
        tabBarIconStyle: { display: 'none' },
        tabBarLabelPosition: 'below-icon',
        tabBarLabelStyle: { fontSize: 16, marginBottom: 15 },
        headerShown: false,
      }}
    >
      <Tab.Screen name="My Shifts" component={MyShifts} />
      <Tab.Screen name="Available Shifts" component={TopTabNavigator} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;