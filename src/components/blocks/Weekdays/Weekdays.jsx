import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Weekdays = ({ weekdays, onToggleFunc }) => {

  return weekdays.map((weekday, _) => {
    return (
      <View key={weekday.id} style={{ alignItems: 'center', justifyContent: 'center', marginRight: 12 }} >
        <TouchableOpacity style={[styles.selector, { backgroundColor: weekday.select ? "#F9CDCD" : "#F7F7F7" }]} onPress={() => onToggleFunc(weekday.id)}>
          <Text style={{ color: weekday.select ? '#fff': '#000', fontWeight: '700'}}>{weekday.title}</Text>
        </TouchableOpacity>
      </View>
    )
  })
}

const styles = StyleSheet.create({
  selector: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Weekdays;