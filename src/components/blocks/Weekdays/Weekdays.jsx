import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, heightPercentage, spaces, widthPercentage } from '../../../theme/theme';

const Weekdays = ({ weekdays, onToggleFunc }) => {

  return weekdays.map((weekday, index) => {
    return (
      <View key={weekday.id} style={{ alignItems: 'center', justifyContent: 'center', marginRight: index === 6 ? 0 : widthPercentage(spaces.s) }} >
        <TouchableOpacity style={[styles.selector, { backgroundColor: weekday.select ? colors.button : colors.gray500 }]} onPress={() => onToggleFunc(weekday.id)}>
          <Text style={{ color: weekday.select ? colors.white : colors.gray300, fontWeight: '700'}}>{weekday.title}</Text>
        </TouchableOpacity>
      </View>
    )
  })
}

const styles = StyleSheet.create({
  selector: {
    width: widthPercentage(40),
    height: heightPercentage(40),
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Weekdays;