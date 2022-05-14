import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useQuery } from 'react-query';
import { findAllRoutine } from '../../api/routines';
import userStore from '../../store/store';
import firestore from '@react-native-firebase/firestore';
//components
import Section from '../../components/atoms/Section/Section';
import ReportCard from '../../components/blocks/ReportCard/ReportCard';
import { fontPercentage, fontSize, heightPercentage, spaces, widthPercentage } from '../../theme/theme';
import { getDate, getMondayDate, getSundayDate } from '../../utils/uitils';
import { fetchweeklyRecord } from '../../api/records';

const WeeklyScreen = () => {
  const user = userStore(state => state.currentUser)
  const uid = user.uid
  const [ refinedData, setRefinedData ] = useState([])
  const { isLoading, isError, data } = useQuery(['fetchweeklyRecord', { uid: uid }], () => fetchweeklyRecord({ uid: uid }), {
    onSuccess: (data) => {
      const dataValues = data.reduce((acc, current) => {
        acc[current.title] = acc[current.title] || [];
        if (current.isCompleted) {
          acc[current.title].push(current.day);
        }
        return acc
      }, {})
      const temp = []
      const routineData = Object.keys(dataValues).map((key) => {
        const planedDays = data.find(element => element.title === key)
        temp.push({ routine: key, isCompleted: dataValues[key], planed: planedDays.weekday })
      });
      setRefinedData(temp)
    }
  })

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>이번주 실천기록</Text>
      {isLoading ? (
        <Text>로딩중...</Text>
      ) : (
        refinedData.map(item => <ReportCard key={item.routine} data={item} /> )
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: widthPercentage(spaces.m),
    paddingVertical: heightPercentage(spaces.m),
  },
  title: {
    fontSize: fontPercentage(fontSize.large),
    fontWeight: '700',
    marginBottom: heightPercentage(spaces.l),
  },
});

export default WeeklyScreen;