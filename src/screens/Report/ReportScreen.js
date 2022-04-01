import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useQuery } from 'react-query';
import { fetchScore } from '../../api/score';
import MainContainer from '../../components/blocks/Containers/MainContainer';
import userStore from '../../store/store';
import { getMondayDate, getSundayDate } from '../../utils/uitils';
import firestore from '@react-native-firebase/firestore';

const ReportScreen = () => {
  const user = userStore(state => state.currentUser)
  const [ dataSet, SetDataSet] = useState()

  let start = getMondayDate(new Date())
  let end = getSundayDate(new Date())

  const {isError, isLoading, data} = useQuery(['fetchScore', { uid : user.uid, start, end }], () => fetchScore({ uid: user.uid, start, end }))

  return (
    <MainContainer>
      
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ReportScreen;