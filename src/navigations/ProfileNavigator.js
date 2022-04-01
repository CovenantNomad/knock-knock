import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import EditNameScreen from '../screens/Profile/EditNameScreen';
import WithdrawalScreen from '../screens/Profile/WithdrawalScreen';
import RoutineScreen from '../screens/Profile/RoutineScreen';
import RoutineEditorScreen from '../screens/Profile/RoutineEditorScreen';
import ResetPasswordScreen from '../screens/Profile/ResetPasswordScreen';

const ProfileStack = createNativeStackNavigator()

const ProfileNavigator = () => {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown:false }}>
      <ProfileStack.Screen name="profileMain" component={ProfileScreen} />
      <ProfileStack.Screen name="editName" component={EditNameScreen} />
      <ProfileStack.Screen name="editPassword" component={ResetPasswordScreen} />
      <ProfileStack.Screen name="withdrawal" component={WithdrawalScreen} />
      <ProfileStack.Screen name="routines" component={RoutineScreen} />
      <ProfileStack.Screen name="editRoutine" component={RoutineEditorScreen} />
    </ProfileStack.Navigator>
  );
}

export default ProfileNavigator;