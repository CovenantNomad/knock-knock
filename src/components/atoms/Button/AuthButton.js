import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors, fontPercentage, fontSize, heightPercentage, spaces, widthPercentage } from '../../../theme/theme';

const AuthButton = ({ onPress, label }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} >
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: heightPercentage(spaces.xl),
    borderRadius: 12,
    backgroundColor: colors.black
  },
  label: {
    color: colors.white,
    fontSize: fontPercentage(fontSize.large),
    fontWeight: '800',
    lineHeight: fontPercentage(fontSize.large),
  },
});

export default AuthButton;