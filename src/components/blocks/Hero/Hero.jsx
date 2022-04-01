import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { colors, heightPercentage, spaces } from '../../../theme/theme';
import * as Linking from 'expo-linking';

const Hero = ({ source, content, Link}) => {
  
  const link = () => {
    Linking.openURL(Link)
  }

  return (
    <TouchableOpacity onPress={link}>
      <View style={styles.container}>
        <Image 
          source={source} 
          resizeMode={'contain'}
          style={styles.banner}
        />
        <Text style={styles.content}>{content}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: heightPercentage(100),
    minHeight: heightPercentage(100),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.banner_background_color,
  },
  banner: {
    width: '100%',
    height: '100%',
    flex: 0.45,
  },
  content: {
    fontSize: 20,
    fontWeight: '700',
    flex: 0.55,
  }
});

export default Hero;