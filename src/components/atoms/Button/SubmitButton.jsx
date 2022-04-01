import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { colors, fontPercentage, fontSize, heightPercentage, spaces } from '../../../theme/theme';

const SubmitButton = ({ label, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    minHeight: heightPercentage(60),
    backgroundColor: colors.submit_button,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: heightPercentage(spaces.m),
  },
  label: {
    color: 'white',
    fontSize: fontPercentage(fontSize.large),
    fontWeight: '800',
    lineHeight: fontPercentage(fontSize.large),
  },
});

export default SubmitButton;