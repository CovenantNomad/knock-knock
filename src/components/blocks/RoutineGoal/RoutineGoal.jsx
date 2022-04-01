import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Divider } from 'react-native-elements';
import { colors, fontPercentage, fontSize, heightPercentage, widthPercentage, spaces } from '../../../theme/theme';

const RoutineGoal = ({ isTimeGoal, setIsTimeGoal, goal, setGoal }) => {
  return (
    <View>
      <Text style={styles.title}>목표설정</Text>
      <View style={styles.section}>
        <View style={styles.subSection}>
          <Text style={styles.subtitle}>형태</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => setIsTimeGoal(true)}>
              <Text style={[styles.selection, isTimeGoal && { fontWeight: '700', color: colors.black }]}>시간</Text>
            </TouchableOpacity>
            <Divider orientation={'vertical'} width={2} style={{ marginHorizontal: widthPercentage(spaces.l)}}/>
            <TouchableOpacity onPress={() => setIsTimeGoal(false)}>
              <Text style={[styles.selection, !isTimeGoal && { fontWeight: '700', color: colors.black }]}>횟수</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Divider style={{ marginVertical: heightPercentage(spaces.m)}}/>
        <View style={styles.subSection}>
          <Text style={styles.subtitle}>목표</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput 
              value={goal}
              onChangeText={text => {setGoal(text)}}
              style={[styles.goalInput, { width: widthPercentage(60), textAlign: 'right', marginRight: widthPercentage(spaces.s)}]}
              selectionColor={colors.textInputSelect}
            />
            <Text style={styles.goalInput}>{isTimeGoal ? "분" : "번"}</Text>
          </View>
        </View>
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
  subtitle: {
    fontSize: fontPercentage(fontSize.medium),
    fontWeight: '700',
  },
  selection: {
    fontSize: fontPercentage(fontSize.medium),
    color: colors.gray500
  },
  goalInput: {
    fontSize: fontPercentage(fontSize.medium),
    color: colors.black
  }
});

export default RoutineGoal;