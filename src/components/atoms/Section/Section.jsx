import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, heightPercentage, spaces, widthPercentage } from '../../../theme/theme';

const Section = ({ ...props }) => {
  return (
    <View style={styles.container}>
       {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.section_background_color,
    width: '100%',
    paddingHorizontal: widthPercentage(spaces.m),
    paddingVertical: heightPercentage(spaces.m),
    marginBottom: heightPercentage(spaces.xxs),
    borderColor: '#EBF2FF',
    borderWidth: 1,
    borderStyle: 'solid',
  },
});

export default Section;