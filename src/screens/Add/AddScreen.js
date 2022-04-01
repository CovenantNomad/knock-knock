import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Divider, Icon } from 'react-native-elements';
import { QueryClient, useMutation, useQueryClient } from 'react-query';
// api
import { createRoutine } from '../../api/routines'
// hook & state
import userStore from '../../store/store';
import routineStore from '../../store/routineStore';
import useSelectWeekday from '../../hooks/useSelectWeekday';
// components
import MainContainer from '../../components/blocks/Containers/MainContainer';
import Header from '../../components/blocks/Header/Header';
import Hero from '../../components/blocks/Hero/Hero';
import SubmitButton from '../../components/atoms/Button/SubmitButton';
import SimpleModal from '../../components/blocks/Modal/SimpleModal';
import { colors, fontPercentage, fontSize, heightPercentage, spaces, widthPercentage } from '../../theme/theme';
import RoutineProps from '../../components/blocks/RoutineProps/RoutineProps';
import RoutineRepeat from '../../components/blocks/RoutineRepeat/RoutineRepeat';
import RoutineTime from '../../components/blocks/RoutineTime/RoutineTime';
import RoutineListItem from '../../components/blocks/RoutineListItem/RoutineListItem';
import RoutineGoal from '../../components/blocks/RoutineGoal/RoutineGoal';

const AddScreen = ({ navigation }) => {
  const user = userStore(state => state.currentUser)
  const [ title, setTitle ] = useState("")
  const [ isTodo, setIsTodo ] = useState(true)
  const [ isTemporary, setIsTemporary] = useState(false)
  const [ isTimeGoal, setIsTimeGoal ] = useState(true)
  const [ goal, setGoal ] = useState("")
  const [ weekdays, onToggleWeekday ] = useSelectWeekday()
  const [ date, setDate ] = useState(new Date())
  const color = routineStore(state => state.selectColor)
  const setSelectColor = routineStore(state => state.setSelectColor)
  const icon = routineStore(state => state.selectIcon)
  const setSelectIcon = routineStore(state => state.setSelectIcon)
  const [ showModal, setShowModal ] = useState(false)
  const [ modalMessage, setModalMessage ] = useState("")
  
  const mutation = useMutation(createRoutine, {
    onSuccess: () => {
      setTitle("")
      setSelectColor('#FC4F4F')
      setSelectIcon('cross')
      setShowModal(true)
      setModalMessage("새로운 루틴이 생성되었습니다.")
    },
    onError: () => {
      setShowModal(true)
      setModalMessage("루틴 생성에 실패했습니다.")
    },
  })

  const onSubmit = async () => {
    const weekday = weekdays.filter(item => item.select === true).map((item)=>item.id)
    const isCompleted = !isTodo

    if (title.length === 0) {
      setShowModal(true)
      setModalMessage("루틴이름을 지정해주세요")
      return
    }

    if (weekday.length === 0 && isTemporary === false) {
      setShowModal(true)
      setModalMessage("반복할 요일을 선택해주세요")
      return
    }

    const submitData = {
      userId: user.uid,
      title,
      isTodo,
      isTemporary,
      isTimeGoal,
      goal,
      count: 0,
      weekday,
      hour: date.getHours(), 
      minute: date.getMinutes(),
      color: color,
      icon: icon,
      isCompleted,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await mutation.mutateAsync(submitData)
  }

  return (
    <MainContainer>
      <Header hasBackButton={false} title={"새 영적루틴 만들기"} navigation={navigation} route="home" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Hero 
          source={require('../../../assets/images/prayforukraine.jpeg')}
          content={`우크라이나를 위해 \n기도합니다`}
        />
        <View style={styles.section}>
          <Text style={styles.menu}>루틴이름</Text>
          <View style={styles.textinputWrapper}>
            <TextInput 
              value={title}
              onChangeText={text => {setTitle(text)}}
              style={styles.textinput}
              selectionColor={colors.textInputSelect}
              autoFocus={false}
            />
          </View>
          <RoutineProps state={isTodo} setState={setIsTodo} />
        </View>
        <View style={styles.section}>
          <RoutineRepeat isTemporary={isTemporary} setIsTemporary={setIsTemporary} weekdays={weekdays} onToggleFunc={onToggleWeekday} />
          {isTodo && <RoutineTime date={date} setDate={setDate} />}
        </View>
        {isTodo && (
          <View style={styles.section}>
            <RoutineGoal isTimeGoal={isTimeGoal} setIsTimeGoal={setIsTimeGoal} goal={goal} setGoal={setGoal} />
          </View>
        )}
        <View style={styles.section}>
          <RoutineListItem title={'색상 선택'} onPress={() => navigation.navigate('selectColor')} />
          <Divider />
          <RoutineListItem title={'아이콘 선택'} onPress={() => navigation.navigate('selectIcon')} />
        </View>
        <SubmitButton onPress={onSubmit} label={"만들기"}/>  
      </ScrollView>
      <SimpleModal show={showModal} setShow={setShowModal} message={modalMessage} />
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
  section: {
    backgroundColor: '#ffffff',
    width: '100%',
    paddingHorizontal: widthPercentage(spaces.m),
    paddingVertical: heightPercentage(spaces.m),
    marginBottom: heightPercentage(spaces.xxs),
    borderColor: '#EBF2FF',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  menu: {
    fontSize: fontPercentage(fontSize.medium),
    fontWeight: '500',
    marginBottom: heightPercentage(spaces.xs),
  },
  textinputWrapper: {
    position: 'relative',
    width: '100%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: heightPercentage(spaces.m),
    paddingHorizontal: widthPercentage(spaces.xs),
    paddingVertical: heightPercentage(spaces.xxs),
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 4,
  },  
  textinput: {
    fontSize: fontPercentage(fontSize.medium),
    paddingVertical: heightPercentage(spaces.xxs),
    width: '100%',
  },
});

export default AddScreen;