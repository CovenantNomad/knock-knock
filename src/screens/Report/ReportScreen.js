import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import userStore from '../../store/store';
import { getMondayDate, getSundayDate } from '../../utils/uitils';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryTooltip } from "victory-native";
//components
import MainContainer from '../../components/blocks/Containers/MainContainer';
import Header from '../../components/blocks/Header/Header';
import Section from '../../components/atoms/Section/Section';
import firestore from '@react-native-firebase/firestore';


const ReportScreen = () => {
  const user = userStore(state => state.currentUser)
  const [ data, setData ] = useState([
    {
      day: '월',
      score: 50,
      label: 50
    },
    {
      day: '화',
      score: 50,
      label: 50
    },
    {
      day: '수',
      score: 50,
      label: 50
    },
    {
      day: '목',
      score: 50,
      label: 50
    },
    {
      day: '금',
      score: 50,
      label: 50
    },
    {
      day: '토',
      score: 50,
      label: 50
    },
    {
      day: '일',
      score: 50,
      label: 50
    },
  ])

  let start = getMondayDate(new Date())
  let end = getSundayDate(new Date())

  // useEffect(() => {
  //   firestore().collection('users').doc(user.uid).collection('scores').where('datetime', '<', end).where('datetime', '>=', start).get()
  //   .then(querySnapshot => {
  //     temp = []
  //     querySnapshot.forEach(doc => {
  //       temp.push({
  //         day: doc.data().day,
  //         score: doc.data().score
  //       })
  //     })
  //     setData(temp)
  //   })
  // }, [])

  return (
    <MainContainer>
      <Header title={'기록'} />
      <Section>
        <VictoryChart width={350} theme={VictoryTheme.material} domain={{ x: [0, 7], y: [0, 100] }}>
          <VictoryBar data={data} x="day" y="score" labelComponent={<VictoryTooltip/>}/>
        </VictoryChart>
      </Section>
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