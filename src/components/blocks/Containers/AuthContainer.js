import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, widthPercentage } from '../../../theme/theme';

const AuthContainer = ({ ...props }) => {

  const dismissKeyboard = () => {
    Keyboard.dismiss()
  }

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
            style={{
              width: '100%', 
              flex: 1,
            }}
            enabled
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.select({
              ios: () => 30,
              android: () => 0
            })()}
          >
          <View style={styles.container}>
              {props.children}
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    paddingHorizontal: widthPercentage(32),
    alignItems: 'center',
    backgroundColor: colors.auth_background_color,
  },
})

export default AuthContainer;