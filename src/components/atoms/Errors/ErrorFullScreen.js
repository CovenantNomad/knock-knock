import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { colors, fontPercentage, fontSize, heightPercentage, spaces, widthPercentage } from '../../../theme/theme';

const ErrorFullScreen = ({ source }) => {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../../../../assets/images/warning.png')} 
        resizeMode={'contain'}
        style={styles.banner}
      />
      <Text style={styles.alram}>
        {`에러가 발생하였습니다.\n개발자에게 문의해주세요.\nadonis0951@naver.com`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: widthPercentage(spaces.m),
    paddingVertical: heightPercentage(spaces.m),
    marginBottom: heightPercentage(spaces.xxs),
    backgroundColor: colors.section_background_color,
    justifyContent: 'center',
    alignItems: 'center'
  },
  banner: {
    width: '70%',
    height: '70%',
  },
  alram: {
    fontSize: fontPercentage(fontSize.medium),
    color: colors.warning,
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default ErrorFullScreen;