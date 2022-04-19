import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { colors, fontPercentage, fontSize, heightPercentage, widthPercentage } from '../../../theme/theme';

const Header = ({ title, hasBackButton, goBack, route, navigation }) => {
  return (
    <View style={styles.container}>
      {hasBackButton && 
        <Icon
          name='md-chevron-back-outline'
          type='ionicon'
          size={36}
          style={{ marginLeft: widthPercentage(-8) }}
          containerStyle={{ marginRight: widthPercentage(8) }}
          onPress={() => {
            goBack ? navigation.goBack(): navigation.navigate(route)
          }}
        />
      }
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: heightPercentage(60),
    paddingHorizontal: widthPercentage(16),
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: fontPercentage(fontSize.title),
    fontWeight: '400'
  }
});

export default Header;