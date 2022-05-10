import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content';
// state & uitils
import userStore from '../../store/store';
import { makeChartData, seperateWeekly, weekNumberByMonth } from '../../utils/uitils';
// api
import { fetchScore } from '../../api/score';
import { useQuery } from 'react-query';
//components
import Section from '../../components/atoms/Section/Section';
import ChartCard from '../../components/blocks/ChartCard/ChartCard';
import { fontPercentage, fontSize, heightPercentage, spaces, colors } from '../../theme/theme';
import ListEmpty from '../../components/blocks/ListEmpty/ListEmpty';
import useChartData from '../../hooks/useChartData';
import ErrorFullScreen from '../../components/atoms/Errors/ErrorFullScreen';


const MonthlyScreen = () => {
  const [ hasError, setHasError ] = useState(false)
  const [ isUpdating, setIsUpdating ] = useState(false)
  const [ records, setRecords ] = useState([])
  const { year, month, weekNo } = weekNumberByMonth(new Date())
  const user = userStore(state => state.currentUser)

  const { isLoading, isError, data } = useQuery(
    ['fetchScore', { uid: user.uid, month: month, year: year }], 
    () => fetchScore({ uid: user.uid, month: month, year: year })
  )
  
  useEffect(() => {
    if (data) {
      makeChartData(weekNo, data, setHasError, setRecords, setIsUpdating)
    }
  }, [data])

  useEffect(() => {
    if (isLoading) {
      setIsUpdating(true)
    }
  }, [])

  return (
    <Section>
      <Text style={styles.title}>이달의 기록</Text>
      <Text style={styles.subtitle}>{year}년 {month}월</Text>
      { (isLoading || isUpdating) ? (
        // <SkeletonContent 
        //   containerStyle={{ width: '100%' }} 
        //   isLoading={isLoading} 
        //   animationType="pulse"
        //   animationDirection="horizontalLeft"
        //   layout={[
        //     { width: '100%', height: heightPercentage(120), marginBottom: 6, key: "first" },
        //     { width: '100%', height: heightPercentage(120), marginBottom: 6, key: "second" },
        //     ]}
        // />
        <Text>로딩중...</Text>
      ) : (
        (isError || hasError) ? (
          // <ErrorFullScreen />
          <Text>오류상태...</Text>
        ) : (
          // <FlatList 
          //   data={records?.sort((a, b) => b.id - a.id)}
          //   renderItem={({ item, index }) => (
          //     <ChartCard data={item} year={year} key={index} />
          //   )}
          //   ListEmptyComponent={() => <ListEmpty content={"작성된 기록이 없습니다"} />}
          //   keyExtractor={item => item.id}
          // />
          <Text>데이터상태</Text>
        )
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