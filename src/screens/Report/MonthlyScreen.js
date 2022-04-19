import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content';
// state & uitils
import userStore from '../../store/store';
import { seperateWeekly, weekNumberByMonth } from '../../utils/uitils';
// api
import { fetchScore } from '../../api/score';
import { useQuery } from 'react-query';
//components
import Section from '../../components/atoms/Section/Section';
import ChartCard from '../../components/blocks/ChartCard/ChartCard';
import { fontPercentage, fontSize, heightPercentage, spaces, colors } from '../../theme/theme';
import ListEmpty from '../../components/blocks/ListEmpty/ListEmpty';


const MonthlyScreen = () => {
  const { year, month, weekNo } = weekNumberByMonth(new Date())
  const user = userStore(state => state.currentUser)
  const [ records, setRecords ] = useState([])
  
  const { isLoading, isError, data } = useQuery(
    ['fetchScore', {uid : user.uid, month: month}], 
    () => fetchScore({ uid : user.uid, month: month })
  )

  useEffect(() => {
    seperateWeekly(weekNo, data, setRecords)
  }, [data])


  return (
    <Section>
      <Text style={styles.title}>이달의 기록</Text>
      <Text style={styles.subtitle}>{year}년 {month}월</Text>
      { isLoading ? (
        <SkeletonContent 
          containerStyle={{ width: '100%' }} 
          isLoading={isLoading} 
          animationType="pulse"
          animationDirection="horizontalLeft"
          layout={[
            { width: '100%', height: heightPercentage(120), marginBottom: 6 },
            { width: '100%', height: heightPercentage(120), marginBottom: 6 },
            ]}
        />
      ) : (
        <FlatList 
          data={records?.sort((a, b) => b.id - a.id)}
          renderItem={({ item, index }) => (
            <ChartCard data={item.data} year={year} key={index} />
          )}
          ListEmptyComponent={() => <ListEmpty content={"작성된 기록이 없습니다"} />}
          keyExtractor={item => item.id}
        />
      )}
    </Section>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: fontPercentage(fontSize.large),
    fontWeight: '700',
    marginBottom: heightPercentage(spaces.xxs)
  },
  subtitle: {
    fontSize: fontPercentage(fontSize.small),
    fontWeight: '700',
    color: colors.grey300,
    marginBottom: heightPercentage(spaces.m)
  },
});

export default MonthlyScreen;