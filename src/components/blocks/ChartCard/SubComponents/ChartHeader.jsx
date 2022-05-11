import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontPercentage, fontSize, heightPercentage, spaces } from '../../../../theme/theme';
import { converStrDate } from '../../../../utils/uitils';

const ChartHeader = ({year, first, end}) => {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{converStrDate(first)} - {converStrDate(end)}</Text>
      <Text style={styles.subtitle}>{year}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: fontPercentage(fontSize.large),
    fontWeight: '700',
    letterSpacing: 0.3,
    color: colors.white,
    marginBottom: heightPercentage(spaces.xxs)
  },
  subtitle: {
    fontSize: fontPercentage(fontSize.small),
    fontWeight: '300',
    letterSpacing: 0.5,
    color: colors.gray100,
  },
});

export default ChartHeader;