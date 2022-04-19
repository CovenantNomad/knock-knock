import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ReactNativeCalendarStrip from 'react-native-calendar-strip';

import DashBoard from '../DashBoard/DashBoard';
import { colors, fontPercentage, fontSize, heightPercentage, spaces, widthPercentage } from '../../../theme/theme';


const ListHeader = ({ calendarRef, date, setDate, percentage, totalCount, completedCount }) => {

  return (
    <>
      <ReactNativeCalendarStrip
        ref={calendarRef}
        selectedDate={date}
        calendarAnimation={{type: 'sequence', duration: 30}}
        daySelectionAnimation={{type: 'border', duration: 200, borderWidth: 1, borderHighlightColor: colors.primary}}
        style={{height: 100, paddingTop: 20, paddingBottom: 10}}
        calendarHeaderStyle={{color: 'black', marginBottom: 12}}
        // calendarColor={'#fff'}
        dateNumberStyle={{color: 'black'}}
        dateNameStyle={{color: 'black'}}
        highlightDateNumberStyle={{color: colors.primary }}
        highlightDateNameStyle={{color: colors.primary }}
        iconContainer={{flex: 0.1}}
        onDateSelected={date => {
          setDate(new Date(date))
        }}
      />
      <View style={styles.dashboardContainer}>
        <DashBoard percentage={percentage} totalCount={totalCount} completedCount={completedCount} today={date} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  dashboardContainer: {
    marginTop: heightPercentage(spaces.s),
    marginBottom: heightPercentage(spaces.s),
    paddingHorizontal: widthPercentage(spaces.m),
  },
});

export default ListHeader;