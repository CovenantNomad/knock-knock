import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
// screnns
import HomeScreen from '../screens/Home/HomeScreen';
import ReportScreen from '../screens/Report/ReportScreen';
import ProfileNavigator from './ProfileNavigator';
import CreateNavigator from './CreateNavigator';

const Tab = createBottomTabNavigator()

const AppNavigator = () => {

  const screenOptions = (({route}) => ({
    tabBarIcon: ({focused}) => {
      let iconName = "home"

      switch (route.name) {
        case "home":
          iconName = "home-sharp"
          break;
        case "report":
            iconName = "bar-chart-sharp"
            break;
        case "add":
          iconName = "add-circle"
          break;
        case "profile":
          iconName = "people"
          break;
        default:
          iconName = "home-sharp"
          break;
      }

      return <Ionicons name={iconName} size={28} color={focused ? '#222' : "#dee2e6"} />
    },
    tabBarShowLabel: false,
    headerShown: false,
  })) 

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="home" component={HomeScreen} />
      <Tab.Screen name="report" component={ReportScreen} />
      <Tab.Screen name="add" component={CreateNavigator} />
      <Tab.Screen name="profile" component={ProfileNavigator} />
    </Tab.Navigator>
  );
}

export default AppNavigator;