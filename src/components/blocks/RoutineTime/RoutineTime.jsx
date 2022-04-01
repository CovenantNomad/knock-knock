import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { widthPercentage, heightPercentage, fontPercentage, fontSize, colors, spaces } from '../../../theme/theme';
// components
import TimePicker from '../TimePicker/TimePicker';

const RoutineTime = ({ date, setDate }) => {
  return (
    <View style={{ marginTop: heightPercentage(spaces.m) }}>
      <Text style={styles.title}>약속 시간</Text>
      <TimePicker date={date} setDate={setDate}/>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: fontPercentage(fontSize.medium),
    fontWeight: '500',
    marginBottom: heightPercentage(spaces.m),
  },
});

export default RoutineTime;