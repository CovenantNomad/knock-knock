import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { colors, fontPercentage, fontSize, heightPercentage, spaces, widthPercentage } from '../../../theme/theme';
import { convertDay } from '../../../utils/uitils';

const ListItemRoutine = ({ routine, onPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{routine.title}</Text>
        <View style={styles.subContent}>
          <Text style={[
            styles.subTitle, 
            {
              marginRight: widthPercentage(spaces.m),
              color: routine.isActive ? "#2196f3": "#f44336"
            }
          ]}>
            {routine.isActive ? "활성": "비활성"}상태
          </Text>
          <Text style={[
            styles.subTitle,
            {
              color: routine.isTodo ? "#2196f3": "#f44336"
            }
          ]}>
            {routine.isTodo ? "교제": "방해"}루틴
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: widthPercentage(spaces.m),
    paddingVertical: heightPercentage(spaces.l),
    borderRadius: 8,
    marginBottom: heightPercentage(spaces.xxs),
    borderBottomWidth: 1,
    borderBottomColor: colors.gray300, 
  },
  content: {
    flex: 1,
  },  
  subContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: heightPercentage(spaces.xxs),
  },
  title: {
    fontSize: fontPercentage(fontSize.menu),
    fontWeight: '600',
  },
  subTitle: {
    fontSize: fontPercentage(fontSize.small),
    fontWeight: '600',
    color: colors.gray700
  },
  button: {
    borderWidth: 1,
    borderColor: colors.gray500,
    borderRadius: 16,
    paddingHorizontal: widthPercentage(spaces.s),
    paddingVertical: heightPercentage(spaces.xxs)
  },
  buttonText: {
    fontSize: fontPercentage(fontSize.medium),
    fontWeight: '600',
    color: colors.gray700
  }
});

export default ListItemRoutine;