import React, { useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useMutation, useQuery, useQueryClient } from 'react-query';
// apis
import { createRecord, deleteRecordById, fetchRecord, updateCount, updateRecordById } from '../../api/records';
import { createScore, updateScore } from '../../api/score';
// states & hooks
import userStore from '../../store/store';
import useCount from '../../hooks/useCount';
// utils & theme
import { weekNumberByMonth } from '../../utils/uitils';
import { colors, heightPercentage, spaces, widthPercentage } from '../../theme/theme';
//components
import MainContainer from '../../components/blocks/Containers/MainContainer';
import ListHeader from '../../components/blocks/ListHeader/ListHeader';
import ListItem from '../../components/blocks/ListItem/ListItem';
import ListEmpty from '../../components/blocks/ListEmpty/ListEmpty';
import ListFooter from '../../components/blocks/ListFooter/ListFooter';
import Section from '../../components/atoms/Section/Section';
import SkeletonContent from 'react-native-skeleton-content';
import SectionTitle from '../../components/atoms/Title/SectionTitle';

const HomeScreen = ({ navigation }) => {
  const calendarRef = useRef()
  const user = userStore(state => state.currentUser)
  const queryClient = useQueryClient()
  const [ isCompletedMutation, setIsCompletedMutation ] = useState(false)
  const [ selectedDate, setSelectedDate ] = useState(new Date())
  const [ refreshing, setRefreshing ] = useState(false)
  const { year, month, weekNo } = weekNumberByMonth(selectedDate)

  const { isLoading, isError, data : routines } = useQuery(
    ['fetchRecord', {uid : user.uid, date: selectedDate}], 
    () => fetchRecord({ uid : user.uid, date: selectedDate }),
    {enabled :isCompletedMutation}
  )

  const createMutation = useMutation(createRecord, {
    onSuccess: async () => {
      await queryClient.fetchQuery(['fetchRecord', {uid : user.uid, date: selectedDate}], 
      () => fetchRecord({ uid : user.uid, date: selectedDate }))
      setIsCompletedMutation(true)
    }
  })

  const completedMutation = useMutation(updateRecordById, {
    onSuccess: async () => {
      await queryClient.refetchQueries(['fetchRecord', {uid : user.uid, date: selectedDate}])
    }
  })

  const createScoreMutation = useMutation(createScore, {
    onSuccess: async () => {
      await queryClient.refetchQueries(['fetchScore', {uid : user.uid, month: month}])
    }
  })
  const updateScoreMutation = useMutation(updateScore, {
    onSuccess: async () => {
      await queryClient.refetchQueries(['fetchScore', {uid : user.uid, month: month}])
    }
  })

  const refresh = () => {
    setRefreshing(true)
    createMutation.mutate({ uid: user.uid, date: selectedDate})
    setRefreshing(false)
  } 

  const onToggleCompleted = (uid, docId, isCompleted) => {
    completedMutation.mutate({ uid, docId, isCompleted })
  }

  const [ percentage, completedCount ] = useCount(routines)

  useEffect(() => {
    setIsCompletedMutation(false)
    createMutation.mutate({ uid: user.uid, date: selectedDate})
    createScoreMutation.mutate({ uid: user.uid, date: selectedDate, score: percentage, total: routines?.length || 0, completed: completedCount})
  }, [selectedDate])

  useEffect(() => {
    updateScoreMutation.mutate({ uid: user.uid, date: selectedDate, score: percentage, total: routines?.length || 0, completed: completedCount })
  }, [percentage])

  return (
    <MainContainer>
      <ListHeader 
        calendarRef={calendarRef} 
        date={selectedDate} 
        setDate={setSelectedDate} 
        percentage={percentage} 
        totalCount={routines?.length || 0} 
        completedCount={completedCount}
      />
      <Section>
        {isLoading ? (
          <SkeletonContent
            containerStyle={{ width: '100%' }} 
            isLoading={isLoading} 
            animationType="pulse"
            animationDirection="horizontalLeft"
            layout={[
              { width: '100%', height: heightPercentage(60), marginBottom: 6 },
              { width: '100%', height: heightPercentage(60), marginBottom: 6 },
              { width: '100%', height: heightPercentage(60), marginBottom: 6 },
              ]}
          />
        ) : (
          <FlatList 
            data={routines?.sort((a, b) => a.hour - b.hour)}
            extraData={routines}
            keyExtractor={(item) => item.title}
            renderItem={({ item, index }) => {
              const isEnd = index === routines?.length - 1;
              return (
                <ListItem item={item} isEnd={isEnd} onToggleCompleted={onToggleCompleted} key={item.title}/>
              )
            }}
            showsVerticalScrollIndicator={false}
            refreshing={refreshing}
            onRefresh={() => refresh()}
            ListHeaderComponent={<SectionTitle title={"오늘의 루틴"} />}
            ListEmptyComponent={<ListEmpty content={"오늘은 작성된 루틴이 없어요"} />}
            ListFooterComponent={<ListFooter onPress={() => navigation.navigate('add')}/>}
          />
        )}
      </Section>  
    </MainContainer>
  );
}

export default HomeScreen;