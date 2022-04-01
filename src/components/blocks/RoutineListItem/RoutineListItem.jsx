import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { fontPercentage, fontSize, heightPercentage, spaces, widthPercentage } from '../../../theme/theme';

const RoutineListItem = ({ title, onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Icon
        name='md-chevron-forward-outline'
        type='ionicon'
        size={24}
        style={{ marginRight: widthPercentage(-4) }}
        onPress={onPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: heightPercentage(spaces.m),
  },
  title: {
    fontSize: fontPercentage(fontSize.medium),
    fontWeight: '500',
  }
});

export default RoutineListItem;