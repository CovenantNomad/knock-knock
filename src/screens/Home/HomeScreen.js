import React, { useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useMutation, useQuery, useQueryClient } from 'react-query';
// apis
import { createRecord, deleteRecordById, fetchRecord, updateCount, updateRecordById } from '../../api/records';
import firestore from '@react-native-firebase/firestore';
// states & hooks
import userStore from '../../store/store';
import useCount from '../../hooks/useCount';
//components
import MainContainer from '../../components/blocks/Containers/MainContainer';
import ListHeader from '../../components/blocks/ListHeader/ListHeader';
import ListItem from '../../components/blocks/ListItem/ListItem';
import { heightPercentage, spaces, widthPercentage } from '../../theme/theme';
import ListEmpty from '../../components/blocks/ListEmpty/ListEmpty';
import Hero from '../../components/blocks/Hero/Hero';
import ListFooter from '../../components/blocks/ListFooter/ListFooter';
import { createScore, updateScore } from '../../api/score';
import ListItemForCount from '../../components/blocks/ListItem/ListItemForCount';
import { getDate } from '../../utils/uitils';
import * as SplashScreen from 'expo-splash-screen';

const HomeScreen = ({ navigation }) => {
  const calendarRef = useRef()
  const user = userStore(state => state.currentUser)
  const queryClient = useQueryClient()
  const [ selectedDate, setSelectedDate ] = useState(new Date())
  const [ refreshing, setRefreshing ] = useState(false)
  // const [ routines, setRoutines ] = useState([])

  const { isLoading, isError, data : routines } = useQuery(
    ['fetchRecord', {uid : user.uid, date: selectedDate}], 
    () => fetchRecord({ uid : user.uid, date: selectedDate }),
    { initialData: [] }
  )

  const createMutation = useMutation(createRecord, {
    onSuccess: async () => {
      await queryClient.fetchQuery(['fetchRecord', {uid : user.uid, date: selectedDate}], 
      () => fetchRecord({ uid : user.uid, date: selectedDate }))
    }
  })

  const completedMutation = useMutation(updateRecordById, {
    onSuccess: async () => {
      await queryClient.refetchQueries(['fetchRecord', {uid : user.uid, date: selectedDate}])
    }
  })

  const countMutation = useMutation(updateCount, {
    onSuccess: async () => {
      await queryClient.refetchQueries(['fetchRecord', {uid : user.uid, date: selectedDate}])
    }
  })

  const createScoreMutation = useMutation(createScore)
  const updateScoreMutation = useMutation(updateScore)

  const refresh = () => {
    setRefreshing(true)
    createMutation.mutate({ uid: user.uid, date: selectedDate})
    setRefreshing(false)
  } 

  const onToggleCompleted = (uid, docId, isCompleted) => {
    completedMutation.mutate({ uid, docId, isCompleted })
  }

  const onToggleCount = (uid, docId, count) => {
    countMutation.mutate({ uid, docId, count })
  }

  const [ percentage, completedCount ] = useCount(routines)

  useEffect(() => {
    createMutation.mutate({ uid: user.uid, date: selectedDate})
    createScoreMutation.mutate({ uid: user.uid, date: selectedDate})
  }, [selectedDate])

  useEffect(() => {
    updateScoreMutation.mutate({ uid: user.uid, date: selectedDate, score: percentage })
  }, [percentage])

  return (
    <MainContainer>
      <FlatList 
        data={routines?.sort((a, b) => a.hour - b.hour)}
        extraData={routines}
        keyExtractor={(item) => item.title}
        renderItem={({ item, index }) => {
          const isEnd = index === routines.length - 1;
          return (
            <View style={{ paddingHorizontal: widthPercentage(spaces.m), backgroundColor: '#fff' }}>
              <ListItem item={item} isEnd={isEnd} onToggleCompleted={onToggleCompleted} key={item.title}/>
            </View>
          )
        }}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={() => refresh()}
        ListHeaderComponent={
          <ListHeader 
            calendarRef={calendarRef} 
            date={selectedDate} 
            setDate={setSelectedDate} 
            percentage={percentage} 
            totalCount={routines.length} 
            completedCount={completedCount}
          />
        }
        ListEmptyComponent={<ListEmpty navigation={navigation} />}
        ListFooterComponent={<ListFooter onPress={() => navigation.navigate('add')}/>}
      />
    </MainContainer>
  );
}

export default HomeScreen;