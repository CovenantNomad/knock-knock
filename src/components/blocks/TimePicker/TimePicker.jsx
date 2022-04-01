import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors, fontPercentage, fontSize, heightPercentage, spaces, widthPercentage } from '../../../theme/theme';

const TimePicker = ({ date, setDate }) => {
  const [ showTimePicker, setShowTimePicker ] = useState(false)

  const onToggleTimePicker = () => {
    setShowTimePicker(previousState => !previousState)
  }

  const onChange = (_, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>시간설정</Text>
        <TouchableOpacity onPress={onToggleTimePicker}>
          <Text style={styles.timer}>{String(date.getHours()).padStart(2, '0')} : {String(date.getMinutes()).padStart(2, '0')}</Text>
        </TouchableOpacity>
      </View>
      
      {showTimePicker &&
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'time'}
          is24Hour={true}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChange}
          // style={[styles.section, styles.dateTimePicker]}
          textColor='#000'
        />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: heightPercentage(spaces.s),
    paddingHorizontal: widthPercentage(spaces.s),
    borderRadius: 8,
    borderColor: colors.hero_border_color,
    borderWidth: 1,
  },
  section: {
    backgroundColor: '#ffffff',
    width: '100%',
    padding: 16,
    borderRadius: 14,
    marginBottom: 20,
    borderColor: '#EBF2FF',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  title: {
    fontSize: fontPercentage(fontSize.medium),
    fontWeight: '700',
  },
  timer: {
    fontSize: fontPercentage(fontSize.medium),
    fontWeight: '700',
  }
});

export default TimePicker;