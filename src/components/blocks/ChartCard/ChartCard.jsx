import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, heightPercentage, spaces, widthPercentage } from '../../../theme/theme';
import Chart from './SubComponents/Chart';
import ChartHeader from './SubComponents/ChartHeader';

const ChartCard = ({ data, year }) => {

  const monday = data?.find(item => item.day === 1) 
  const sunday = data?.find(item => item.day === 0)

  console.log(sunday)

  return (
    <View style={styles.container}>
      {/* <ChartHeader year={year} first={monday} end={sunday}/> */}
      <Chart data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray500,
    paddingHorizontal: widthPercentage(spaces.m),
    paddingVertical: heightPercentage(spaces.m),
    borderRadius: 12,
  },
});

export default ChartCard;