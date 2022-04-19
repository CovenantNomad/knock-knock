import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fontPercentage, fontSize, heightPercentage, widthPercentage } from '../../../theme/theme';

const TopTabHeader = ({ title, hasBackButton, goBack, route, navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: insets.top }}>
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

export default TopTabHeader;