import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
// screnns
import HomeScreen from '../screens/Home/HomeScreen';
import ProfileNavigator from './ProfileNavigator';
import CreateNavigator from './CreateNavigator';
import { colors } from '../theme/theme';
import ReportNavigator from './ReportNavigator';

const Tab = createBottomTabNavigator()

const AppNavigator = () => {

  const screenOptions = (({route}) => ({
    tabBarIcon: ({focused}) => {
      let iconName = "home"

      switch (route.name) {
        case "home":
          iconName = "home"
          break;
        case "report":
            iconName = "barschart"
            break;
        case "add":
          iconName = "addfile"
          break;
        case "profile":
          iconName = "user"
          break;
        default:
          iconName = "home"
          break;
      }

      return <AntDesign name={iconName} size={28} color={focused ? colors.black : colors.gray500} />
    },
    tabBarShowLabel: false,
    headerShown: false,
  })) 

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="home" component={HomeScreen} />
      <Tab.Screen name="report" component={ReportNavigator} />
      <Tab.Screen name="add" component={CreateNavigator} />
      <Tab.Screen name="profile" component={ProfileNavigator} />
    </Tab.Navigator>
  );
}

export default AppNavigator;