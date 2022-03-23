import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, heightPercentage, spaces, widthPercentage } from '../../../theme/theme';

const MainContainer = ({ ...props }) => {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        {props.children}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.main_background_color,
    paddingBottom: heightPercentage(spaces.l)
  },
});

export default MainContainer;