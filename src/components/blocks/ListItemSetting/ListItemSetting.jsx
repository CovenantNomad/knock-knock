import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { fontPercentage, fontSize, heightPercentage, spaces, widthPercentage } from '../../../theme/theme';

const ListItemSetting = ({ navigation, dest, title, hasContent, content }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>
      {hasContent ? (
        <View style={styles.rowWrapper}>
          <Text style={styles.content}>{content}</Text>
          <Icon
            name='md-chevron-forward-outline'
            type='ionicon'
            size={24}
            style={{ marginRight: widthPercentage(-4) }}
            onPress={() => navigation.navigate(dest, {content})}
          />
        </View>
      ) : (
        <View>
          <Icon
            name='md-chevron-forward-outline'
            type='ionicon'
            size={24}
            style={{ marginRight: widthPercentage(-4) }}
            onPress={() => navigation.navigate(dest)}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: heightPercentage(spaces.s),
  },
  rowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: fontPercentage(fontSize.menu),
    fontWeight: '300',
  },
  content: {
    fontSize: fontPercentage(fontSize.menu),
    fontWeight: '300',
    marginRight: widthPercentage(spaces.xs)
  },
});

export default ListItemSetting;