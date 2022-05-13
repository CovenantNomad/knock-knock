import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, heightPercentage, spaces, widthPercentage } from '../../../theme/theme';

const ReportCard = ({ data }) => {
  console.log(data)
  return (
    <View style={styles.container}>
      <Text>{data.routine}</Text>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text>계획한 날</Text>
        <View style={{ display: 'flex', flexDirection: 'row'}}>
          {data.planed.map(item => <Text key={item}>{item}</Text>)}
        </View>
        
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text>실천한 날</Text>
        <View style={{ display: 'flex', flexDirection: 'row'}}>
          {data.isCompleted.map(item => <Text key={item}>{item}</Text>)}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderColor: colors.gray100,
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: widthPercentage(spaces.m),
    paddingVertical: heightPercentage(spaces.l),
  },
});

export default ReportCard;