import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Divider, Switch } from 'react-native-elements';
import useSelectWeekday from '../../hooks/useSelectWeekday';
import userStore from '../../store/store';
import updateStore from '../../store/updateStore';
//components
import MainContainer from '../../components/blocks/Containers/MainContainer';
import Header from '../../components/blocks/Header/Header';
import { colors, fontPercentage, fontSize, heightPercentage, spaces, widthPercentage } from '../../theme/theme';
import Section from '../../components/atoms/Section/Section';
import RoutineProps from '../../components/blocks/RoutineProps/RoutineProps';
import RoutineRepeat from '../../components/blocks/RoutineRepeat/RoutineRepeat';
import RoutineTime from '../../components/blocks/RoutineTime/RoutineTime';
import RoutineGoal from '../../components/blocks/RoutineGoal/RoutineGoal';
import RoutineListItem from '../../components/blocks/RoutineListItem/RoutineListItem';
import SimpleModal from '../../components/blocks/Modal/SimpleModal';
import SubmitButton from '../../components/atoms/Button/SubmitButton';
import OutlineButton from '../../components/atoms/Button/OutlineButton';
import ConfirmModal from '../../components/blocks/Modal/ConfirmModal';
import { useMutation, useQueryClient } from 'react-query';
import { deleteRoutine, updateRoutine } from '../../api/routines';

const RoutineEditorScreen = ({ navigation, route }) => {
  const oldRoutine = route.params
  const user = userStore(state => state.currentUser)
  const [ title, setTitle ] = useState("")
  const [ isTodo, setIsTodo ] = useState(true)
  const [ isTemporary, setIsTemporary] = useState(false)
  const [ isTimeGoal, setIsTimeGoal ] = useState(true)
  const [ goal, setGoal ] = useState("")
  const [ weekdays, setWeekdays, onToggleWeekday ] = useSelectWeekday()
  const [ date, setDate ] = useState(new Date())
  const color = updateStore(state => state.updateColor)
  const setSelectColor = updateStore(state => state.setUpdateColor)
  const icon = updateStore(state => state.updateIcon)
  const setSelectIcon = updateStore(state => state.setUpdateIcon)
  const [ isActive, SetIsActive ] = useState(true)
  const [ showModal, setShowModal ] = useState(false)
  const [ modalMessage, setModalMessage ] = useState("")
  const [ showWarningModal, setShowWarningModal ] = useState(false)
  const queryClient = useQueryClient()

  const onToggleWarningMoadl = () => setShowWarningModal(!showWarningModal)

  useEffect(() => {
    setTitle(oldRoutine.title)
    setIsTodo(oldRoutine.isTodo)
    setIsTemporary(oldRoutine.isTemporary)
    setWeekdays(
      weekdays.map(day =>
        oldRoutine.weekday.includes(day.id) ? {...day, select: true} : day
      )
    )
    setIsTimeGoal(oldRoutine.isTimeGoal)
    setGoal(oldRoutine.goal)
    date.setHours(Number(oldRoutine.hour), Number(oldRoutine.minute))
    setSelectColor(oldRoutine.color)
    setSelectIcon(oldRoutine.icon)
    SetIsActive(oldRoutine.isActive)

  }, [])

  const onSubmit = () => {
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

    updateMutation.mutate({
      userId: user.uid,
      routineId: oldRoutine.routineId, 
      data: submitData
    })
  }

  const updateMutation = useMutation(({ userId, routineId, data }) => updateRoutine(userId, routineId, data), {
    onSuccess: () => {
      queryClient.invalidateQueries('fetchAllRoutines')
      setShowModal(true)
      setModalMessage("업데이트가 성공하였습니다.")
    },
    onError: () => {
      setShowModal(true)
      setModalMessage("업데이트에 실패했습니다.")
    },
  })

  const delteMutation = useMutation(({ userId, routineId }) => deleteRoutine(userId, routineId), {
    onSuccess: () => {
      queryClient.invalidateQueries('fetchAllRoutines')
      setShowWarningModal(!showWarningModal)
      navigation.goBack()
    },
  })
  
  return (
    <MainContainer>
      <Header hasBackButton title={"루틴 수정하기"} navigation={navigation} route="myRoutines" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Section>
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
        </Section>
        <Section>
          <RoutineRepeat isTemporary={isTemporary} setIsTemporary={setIsTemporary} weekdays={weekdays} onToggleFunc={onToggleWeekday} />
          {isTodo && <RoutineTime date={date} setDate={setDate} />}
        </Section>
        {isTodo && (
          <Section>
            <RoutineGoal isTimeGoal={isTimeGoal} setIsTimeGoal={setIsTimeGoal} goal={goal} setGoal={setGoal} />
          </Section>
        )}
        <Section>
          <RoutineListItem title={'색상 선택'} onPress={() => navigation.navigate('updateColor')} />
          <Divider />
          <RoutineListItem title={'아이콘 선택'} onPress={() => navigation.navigate('updateIcon')} />
        </Section>
        <Section>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',}}>
            <Text style={{ fontSize: fontPercentage(fontSize.medium), fontWeight: '500' }}>활성화 설정</Text>
            <Switch 
              value={isActive}
              onValueChange={(value) => SetIsActive(value)}
            />
          </View>
          <View style={{ marginTop: heightPercentage(spaces.l), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
            <Text style={{ fontSize: fontPercentage(fontSize.medium), fontWeight: '500' }}>삭제하기</Text>
            <OutlineButton label={"삭제하기"} onPress={() => setShowWarningModal(true)}/>
          </View>
        </Section>
        <SubmitButton onPress={onSubmit} label={"업데이트"}/>  
      </ScrollView>
      <SimpleModal show={showModal} setShow={setShowModal} message={modalMessage} />
      <ConfirmModal visible={showWarningModal} toggleDialog={onToggleWarningMoadl} title={'영적루틴 삭제하기'} content={"정말 해당 영적루틴을 삭제 하시겠습니까?"} primaryAction={() => delteMutation.mutate({ userId: user.uid, routineId: oldRoutine.routineId })} secondaryAction={onToggleWarningMoadl}/>
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
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

export default RoutineEditorScreen;