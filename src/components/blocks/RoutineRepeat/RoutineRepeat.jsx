import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { fontPercentage, fontSize, heightPercentage, widthPercentage, spaces, colors } from '../../../theme/theme';
// components
import Weekdays from '../Weekdays/Weekdays';

const RoutineRepeat = ({ isTemporary, setIsTemporary, weekdays, onToggleFunc }) => {
  return (
    <View>
      <Text style={styles.title}>반복 주기</Text>
      <View style={[ styles.section, { marginBottom: heightPercentage(spaces.xxs) }]}>
        <View style={styles.subSection}>
          <Text style={styles.subtitle}>오늘만</Text>
          <TouchableOpacity style={[ styles.select, isTemporary && {backgroundColor: colors.primary, borderWidth: 0 }]} onPress={() => setIsTemporary(true)}>
            {isTemporary && (
              <Icon 
                name={'check'}
                type='font-awesome-5'
                color={colors.white}
                size={16}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.section}>
        <View style={styles.subSection}>
          <Text style={styles.subtitle}>정기적</Text>
          <TouchableOpacity style={[styles.select, !isTemporary && {backgroundColor: colors.primary, borderWidth: 0}]} onPress={() => setIsTemporary(false)}>
            {!isTemporary && (
              <Icon 
                name={'check'}
                type='font-awesome-5'
                color={colors.white}
                size={16}
              />
            )}
          </TouchableOpacity>
        </View>
        {!isTemporary && (
          <View style={styles.weekdaysWrapper}>
            <Weekdays weekdays={weekdays} onToggleFunc={onToggleFunc} />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: fontPercentage(fontSize.medium),
    fontWeight: '500',
    marginBottom: heightPercentage(spaces.m),
  },
  subtitle: {
    fontSize: fontPercentage(fontSize.medium),
    fontWeight: '700',
  },
  section: {
    paddingVertical: heightPercentage(spaces.s),
    paddingHorizontal: widthPercentage(spaces.s),
    borderRadius: 8,
    borderColor: colors.hero_border_color,
    borderWidth: 1,
  },
  subSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weekdaysWrapper: {
    flexDirection: 'row', 
    justifyContent: 'space-around',
    marginTop: heightPercentage(spaces.m),
  },
  select: {
    width: widthPercentage(28),
    height: heightPercentage(28),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    borderColor: colors.gray500,
    borderWidth: 2,
  }
});

export default RoutineRepeat;