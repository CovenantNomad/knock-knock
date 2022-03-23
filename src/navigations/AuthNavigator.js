import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// components
import SignInScreen from '../screens/Auth/SignInScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen';
import ForgottenPasswordScreen from '../screens/Auth/ForgottenPasswordScreen';
import OnboardingScreen from '../screens/Auth/OnboardingScreen';

const AuthStack = createNativeStackNavigator()

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown:false }}>
      <AuthStack.Screen name="onboarding" component={OnboardingScreen} />
      <AuthStack.Screen name="signin" component={SignInScreen} />
      <AuthStack.Screen name="signup" component={SignUpScreen} />
      <AuthStack.Screen name="forgottenPassword" component={ForgottenPasswordScreen} />
    </AuthStack.Navigator>
  );
}

export default AuthNavigator;