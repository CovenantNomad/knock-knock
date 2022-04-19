import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { fontPercentage, fontSize, heightPercentage, spaces, widthPercentage } from '../../../theme/theme';

const SectionTitle = ({title}) => {
  return (
    <Text style={styles.menu}>{title}</Text>
  );
}

const styles = StyleSheet.create({
  menu: {
    fontSize: fontPercentage(fontSize.large),
    fontWeight: '700',
    marginBottom: heightPercentage(spaces.m),
  },
});

export default SectionTitle;