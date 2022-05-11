import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, heightPercentage, spaces, widthPercentage } from '../../../theme/theme';
import Chart from './SubComponents/Chart';
import ChartHeader from './SubComponents/ChartHeader';

const ChartCard = ({ data, year }) => {

  return (
    <View style={styles.container}>
      <ChartHeader year={year} first={data.monday} end={data.sunday}/>
      <Chart data={data.data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray500,
    paddingHorizontal: widthPercentage(spaces.m),
    paddingVertical: heightPercentage(spaces.s),
    marginBottom: heightPercentage(spaces.xxs),
    borderRadius: 12,
  },
});

export default ChartCard;