import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content';
import { useQuery } from 'react-query';
import { findAllRoutine } from '../../api/routines';
import Button from '../../components/atoms/Button/Button';
import Section from '../../components/atoms/Section/Section';
import MainContainer from '../../components/blocks/Containers/MainContainer';
import Header from '../../components/blocks/Header/Header';
import ListItemRoutine from '../../components/blocks/ListItemRoutine/ListItemRoutine';
import userStore from '../../store/store';
import { heightPercentage, spaces, widthPercentage } from '../../theme/theme';

const RoutineScreen = ({ navigation }) => {
  const user = userStore(state => state.currentUser)
  const uid = user.uid
  const [ filter, setFilter ] = useState("all")

  const { isLoading, isError, data } = useQuery(['fetchAllRoutines', { uid: uid, filter: filter }], () => findAllRoutine({ uid: uid, filter: filter}))

  const select = [
    {
      id: 0,
      label: "전체",
      filter: "all"
    },
    {
      id: 1,
      label: "활성루틴",
      filter: "isActive"
    },
    {
      id: 2,
      label: "비활성루틴",
      filter: "isNotActive"
    },
  ]

  return (
    <MainContainer>
      <Header navigation={navigation} hasBackButton={true} goBack={true} title={"나의 영적루틴"} />
      <View style={styles.container}>
        <View style={styles.filterContainer}>
          {select.map((item, index) => <Button key={item.id} label={item.label} onPress={() => setFilter(item.filter)} isLeft={index === 0} isRight={index === 2} isSelect={filter === item.filter}/>)}
        </View>
        {isLoading ? (
          <SkeletonContent
            containerStyle={{ width: '100%' }} 
            isLoading={isLoading} 
            animationType="pulse"
            animationDirection="horizontalLeft"
            layout={[
              { width: '100%', height: heightPercentage(50), marginBottom: 6 },
              { width: '100%', height: heightPercentage(50), marginBottom: 6 },
              { width: '100%', height: heightPercentage(50), marginBottom: 6 },
              ]}
          />
        ) : (
          isError ? (
            <Text>Something Wrong...</Text>
          ) : (
            <FlatList 
              data={data.sort((a, b) => b.isTodo-a.isTodo)}
              keyExtractor={(item) => item.title}
              renderItem={({ item }) => <ListItemRoutine routine={item} onPress={() => navigation.navigate("editRoutine", item)} />}
            />
          )
        )}
      </View>
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    paddingHorizontal: widthPercentage(spaces.m),
    paddingVertical: heightPercentage(spaces.m),
  },
  filterContainer: {
    flexDirection: 'row',
    borderBottomColor: '#EBF2FF',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    paddingBottom: heightPercentage(spaces.m),
    marginBottom: heightPercentage(spaces.m),
  },
});

export default RoutineScreen;