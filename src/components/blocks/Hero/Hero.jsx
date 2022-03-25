import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { colors, heightPercentage } from '../../../theme/theme';

const Hero = ({ source, content}) => {
  return (
    <View style={styles.container}>
      <Image 
        source={source} 
        resizeMode={'contain'}
        style={styles.banner}
      />
      <Text style={styles.content}>{content}</Text>
    </View>
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
    borderBottomColor: colors.hero_border_color,
    borderBottomWidth: 1,
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