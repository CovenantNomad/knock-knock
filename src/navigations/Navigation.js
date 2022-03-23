import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useStore from '../store/store';

// Navigator
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';


const Navigation = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

const RootStack = createNativeStackNavigator()

const RootNavigator = () => {
  const currentUser = useStore(state => state.currentUser)

  return (
    <RootStack.Navigator screenOptions={{ headerShown:false }}>
      {currentUser.isLoggedIn ? (
        <RootStack.Screen name='app' component={AppNavigator} />     
      ) : 
      (
        <RootStack.Screen name='auth' component={AuthNavigator} />
      )}
    </RootStack.Navigator>
  )
}

export default Navigation;