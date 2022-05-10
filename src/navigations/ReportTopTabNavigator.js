import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MonthlyScreen from '../screens/Report/MonthlyScreen';
import WeeklyScreen from '../screens/Report/WeeklyScreen';
import { Dimensions } from 'react-native';

const Tab = createMaterialTopTabNavigator();

const ReportTopTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{
      tabBarScrollEnabled: true,
      tabBarBounces: false,
      tabBarLabelStyle: { fontSize: 16, fontWeight: '700' },
      tabBarItemStyle: { width: Dimensions.get('screen').width / 2 },
      tabBarIndicatorStyle: { backgroundColor: '#000'}
    }}>
      <Tab.Screen name="monthlyRecords" component={MonthlyScreen} options={{ tabBarLabel: '이달의 기록' }}/>
      <Tab.Screen name="weeklyRecords" component={WeeklyScreen} options={{ tabBarLabel: '루틴별 기록' }}/>
    </Tab.Navigator>
  );
}

export default ReportTopTabNavigator;