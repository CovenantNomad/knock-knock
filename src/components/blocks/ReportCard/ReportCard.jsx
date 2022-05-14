import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontPercentage, fontSize, heightPercentage, spaces, widthPercentage } from '../../../theme/theme';
import { convertDay } from '../../../utils/uitils';

const ReportCard = ({ data }) => {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.routine}</Text>
        <View style={styles.section}>
          <View style={[styles.rowWrapper, { borderBottomWidth: 1, borderBottomColor: colors.gray300 }]}>
            <Text style={styles.subtitle}>계획한 날</Text>
            <Text style={styles.content}>{data?.planed?.length}</Text>
          </View>
          <View style={[styles.rowWrapper]}>
            <Text style={styles.subtitle}>실천한 날</Text>
            <Text style={styles.content}>{data?.isCompleted?.length}</Text>
          </View>
        </View>
        <View style={styles.dayWrapper}>
          {data.planed.map(item => (
            <View style={[styles.dayBox, { backgroundColor: data.isCompleted.includes(item) ? colors.button : colors.gray500 }]}>
              <Text style={{ color: data.isCompleted.includes(item) ? colors.white : colors.black, fontWeight: '700' }}>{convertDay(item)}</Text>
            </View>
          ))}
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderColor: colors.hero_border_color,
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: widthPercentage(spaces.m),
    paddingVertical: heightPercentage(spaces.l),
    marginBottom: heightPercentage(spaces.m),
  },
  title: {
    fontSize: fontPercentage(fontSize.large),
    fontWeight: '700',
    marginBottom: heightPercentage(spaces.l),
  },
  section: {
    borderColor: colors.gray300,
    borderWidth: 1,
    paddingHorizontal: widthPercentage(spaces.s)
  },
  rowWrapper: {
    display: 'flex', 
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: heightPercentage(spaces.s),
  },
  subtitle: {
    fontSize: fontPercentage(fontSize.medium),
    fontWeight: '300',
  },
  content: {
    fontSize: fontPercentage(fontSize.medium),
    fontWeight: '700',
  },
  dayWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: widthPercentage(spaces.s),
    marginTop: heightPercentage(spaces.l)
  },
  dayBox: {
    width: widthPercentage(40),
    height: heightPercentage(40),
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default ReportCard;