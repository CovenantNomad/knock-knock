import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Divider, Icon } from 'react-native-elements';
import SubmitButton from '../../components/atoms/Button/SubmitButton';

// components
import MainContainer from '../../components/blocks/Containers/MainContainer';
import Header from '../../components/blocks/Header/Header';
import Hero from '../../components/blocks/Hero/Hero';
import TimePicker from '../../components/blocks/TimePicker/TimePicker';
import Weekdays from '../../components/blocks/Weekdays/Weekdays';
import useSelectWeekday from '../../hooks/useSelectWeekday';
import routineStore from '../../store/routineStore';
import { colors, fontPercentage, fontSize, heightPercentage, spaces, widthPercentage } from '../../theme/theme';

const AddScreen = ({ navigation, route }) => {
  const [ title, setTitle ] = useState("")
  const [ duration, setDuration ] = useState("")
  const [ weekdays, onToggleWeekday ] = useSelectWeekday()
  const [ date, setDate ] = useState(new Date())
  const color = routineStore(state => state.selectColor)
  const icon = routineStore(state => state.selectIcon)
  

  const onSubmit = () => {
    const weekday = weekdays.filter(item => item.select === true).map((item)=>item.id)

    const submitData = {
      title,
      duration,
      weekday,
      hour: date.getHours(), 
      minute: date.getMinutes(),
      color: color,
      icon: icon,
    }

    console.log(submitData)
  }

  return (
    <MainContainer>
      <Header hasBackButton={false} title={"새로운 영적루틴 만들기"} navigation={navigation} route="home" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Hero />
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