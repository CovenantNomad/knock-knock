import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors, fontPercentage, fontSize, heightPercentage, spaces, widthPercentage } from '../../../theme/theme';

const Button = ({ onPress, label, isLeft, isRight, isTop, isSelect }) => {
  return (
    <TouchableOpacity style={[
        styles.button, 
        {
          marginRight: isLeft && widthPercentage(spaces.xxs),
          marginLeft: isRight && widthPercentage(spaces.xxs),
          marginBottom: isTop && heightPercentage(spaces.s),
          backgroundColor: isSelect ? colors.button : colors.white
        }
      ]} 
      onPress={onPress}
    >
      <Text style={[styles.label, {color: isSelect ? colors.white : colors.button}]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: heightPercentage(spaces.m),
    borderRadius: 12,
    borderColor: colors.button,
    borderWidth: 1,
  },
  label: {
    color: 'white',
    fontSize: fontPercentage(fontSize.medium),
    fontWeight: '700',
  },
});

export default Button;