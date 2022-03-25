import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentage, spaces } from '../../../theme/theme';
import * as Linking from 'expo-linking';

const ListFooter = () => {

  const link = () => {
    Linking.openURL("https://smartstore.naver.com/honestday")
  }

  return (
    <TouchableOpacity onPress={link}>
      <View style={styles.container}>
        <Image 
          source={require('../../../../assets/images/honestday.jpeg')} 
          resizeMode={'contain'}
          style={styles.banner}
        />
        <Text style={styles.content}>{'하나님 나라를 세워가는\n정직한 하루'}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: heightPercentage(80),
    minHeight: heightPercentage(70),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: heightPercentage(spaces.xxs)
  },
  banner: {
    width: '100%',
    height: '100%',
    flex: 0.4,
  },
  content: {
    fontSize: 20,
    fontWeight: '700',
    flex: 0.6,
  }
});

export default ListFooter;