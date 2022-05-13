import React from 'react';
import { StyleSheet,  View, Text, TouchableOpacity } from 'react-native';
import { colors, fontPercentage, fontSize, heightPercentage, spaces, widthPercentage } from '../../../theme/theme';

const ListFooter = ({ onPress }) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress} >
        <Text style={styles.label}>새 영적루틴 만들기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: heightPercentage(spaces.xl),
    backgroundColor: '#fff',
    paddingBottom: heightPercentage(spaces.m),
  },
  button: {
    minHeight: heightPercentage(40),
    backgroundColor: colors.button,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: heightPercentage(spaces.s),
    borderRadius: 8,
  },
  label: {
    color: 'white',
    fontSize: fontPercentage(fontSize.large),
    fontWeight: '800',
  },
});

export default ListFooter;