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
import TimePicker from '../../components/blocks/TimePicker/TimePicker';
import Weekdays from '../../components/blocks/Weekdays/Weekdays';
import SubmitButton from '../../components/atoms/Button/SubmitButton';
import SimpleModal from '../../components/blocks/Modal/SimpleModal';
import { colors, fontPercentage, fontSize, heightPercentage, spaces, widthPercentage } from '../../theme/theme';


const AddScreen = ({ navigation }) => {
  const user = userStore(state => state.currentUser)
  const [ title, setTitle ] = useState("")
  const [ duration, setDuration ] = useState("")
  const [ weekdays, onToggleWeekday ] = useSelectWeekday()
  const [ date, setDate ] = useState(new Date())
  const color = routineStore(state => state.selectColor)
  const icon = routineStore(state => state.selectIcon)
  const [ showModal, setShowModal ] = useState(false)
  const [ modalMessage, setModalMessage ] = useState(false)
  
  const mutation = useMutation(createRoutine, {
    onSuccess: () => {
      setTitle("")
      setDuration("")
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

    const submitData = {
      userId: user.uid,
      title,
      duration,
      weekday,
      hour: date.getHours(), 
      minute: date.getMinutes(),
      color: color,
      icon: icon,
      completed: false,
    }

    await mutation.mutateAsync(submitData)
  }

  return (
    <MainContainer>
      <Header hasBackButton={false} title={"새로운 영적루틴 만들기"} navigation={navigation} route="home" />
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
            />
          </View>
          <Text style={styles.menu}>소요시간</Text>
          <View style={styles.textinputWrapper}>
            <TextInput 
              value={duration}
              onChangeText={text => {setDuration(text)}}
              style={styles.textinput}
              selectionColor={colors.textInputSelect}
            />
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.menu}>루틴 주기</Text>
          <View style={styles.weekdaysWrapper}>
            <Weekdays weekdays={weekdays} onToggleFunc={onToggleWeekday} />
          </View>
          <Text style={styles.menu}>루틴 시간</Text>
          <View style={styles.weekdaysWrapper}>
            <TimePicker date={date} setDate={setDate}/>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.subSection}>
            <Text style={styles.menu}>색상 선택</Text>
            <Icon
              name='md-chevron-forward-outline'
              type='ionicon'
              size={24}
              style={{ marginRight: widthPercentage(-4) }}
              onPress={() => navigation.navigate('selectColor')}
            />
          </View>
          <Divider />
          <View style={styles.subSection}>
            <Text style={styles.menu}>아이콘 선택</Text>
            <Icon
              name='md-chevron-forward-outline'
              type='ionicon'
              size={24}
              style={{ marginRight: widthPercentage(-4) }}
              onPress={() => navigation.navigate('selectIcon', {
                
              })}
            />
          </View>
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
    paddingTop: heightPercentage(spaces.m),
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
    fontSize: 16,
    paddingVertical: heightPercentage(spaces.xxs),
    width: '100%',
  },
  weekdaysWrapper: {
    flexDirection: 'row', 
    justifyContent: 'space-around',
    paddingHorizontal: widthPercentage(spaces.xs),
    paddingVertical: heightPercentage(spaces.xxs),
    marginBottom: heightPercentage(spaces.m),
  },
  subSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: heightPercentage(spaces.m),
  }
});

export default AddScreen;