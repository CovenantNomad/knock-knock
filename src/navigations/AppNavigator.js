import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home/HomeScreen';
import ReportScreen from '../screens/Report/ReportScreen';
import ProfileNavigator from './ProfileNavigator';
import CreateNavigator from './CreateNavigator';

const Tab = createBottomTabNavigator()

const AppNavigator = () => {

  return (
    <Tab.Navigator screenOptions={{ headerShown:false }}>
      <Tab.Screen name="home" component={HomeScreen} />
      <Tab.Screen name="report" component={ReportScreen} />
      <Tab.Screen name="add" component={CreateNavigator} />
      <Tab.Screen name="profile" component={ProfileNavigator} />
    </Tab.Navigator>
  );
}

export default AppNavigator;