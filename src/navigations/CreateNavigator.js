import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// screens
import AddScreen from '../screens/Add/AddScreen';
import ColorScreen from '../screens/Add/ColorScreen';
import IconScreen from '../screens/Add/IconScreen';

const CreateStack = createNativeStackNavigator()

const CreateNavigator = () => {
  return (
    <CreateStack.Navigator screenOptions={{ headerShown:false }}>
      <CreateStack.Screen name="createRoutine" component={AddScreen} />
      <CreateStack.Screen name="selectColor" component={ColorScreen} />
      <CreateStack.Screen name="selectIcon" component={IconScreen} />
    </CreateStack.Navigator>
  );
}

export default CreateNavigator;