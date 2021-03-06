import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { fontPercentage, fontSize, heightPercentage, spaces, widthPercentage } from '../../../theme/theme';

const ListEmpty = ({ content }) => {

  return (
    <View style={styles.container}>
      <Image 
        source={require('../../../../assets/images/counting_stars.png')} 
        style={styles.image}
      />
      <Text style={styles.content}>{content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: widthPercentage(spaces.m), 
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: heightPercentage(spaces.xl)
  },
  image: {
    width: 280,
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    fontSize: fontPercentage(fontSize.large),
    fontWeight: '800',
  }
});

export default ListEmpty;