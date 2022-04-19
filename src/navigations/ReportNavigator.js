import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ReportTopTabNavigator from './ReportTopTabNavigator';
import TopTabHeader from '../components/blocks/Header/TopTabHeader';

const ReportStack = createNativeStackNavigator()

const ReportNavigator = () => {

  return (
    <ReportStack.Navigator screenOptions={{ 
      headerShadowVisible: false, 
      header: () => <TopTabHeader title="동행기록" />
    }}>
      <ReportStack.Screen 
        name="reportTopTab" 
        component={ReportTopTabNavigator} 
      />
    </ReportStack.Navigator>
  );
}

export default ReportNavigator;