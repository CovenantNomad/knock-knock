import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { logOut } from '../../api/auth';
import SubmitButton from '../../components/atoms/Button/SubmitButton';
import Section from '../../components/atoms/Section/Section';
import MainContainer from '../../components/blocks/Containers/MainContainer';
import Header from '../../components/blocks/Header/Header';
import Hero from '../../components/blocks/Hero/Hero';
import ListItemSetting from '../../components/blocks/ListItemSetting/ListItemSetting';
import userStore from '../../store/store';
import { fontPercentage, fontSize, heightPercentage, widthPercentage, spaces, colors } from '../../theme/theme';

const ProfileScreen = ({ navigation }) => {
  const user = userStore(state => state.currentUser)
  const setUser = userStore(state => state.setCurrentUser)

  const onLogout = async () => {
    const loggedOut = await logOut()

    if (loggedOut) {
      await AsyncStorage.removeItem("authentication")
      setUser({
        isLoggedIn: false,
      });
    }
  }

  return (
    <MainContainer>
      <Header title={"마이페이지"} />
      <Hero
          source={require('../../../assets/images/honestday.jpeg')}
          content={'하나님 나라를 세워가는\n정직한 하루'}
        />
      <View style={styles.container}>
        <View style={{ backgroundColor: colors.main_background_color}}>
          <Section>
            <Text style={styles.menu}>계정관리</Text>
            <View style={styles.listItem}>
              <Text style={styles.title}>이메일</Text>
              <Text style={styles.content}>{user.email}</Text>
            </View>
            <ListItemSetting navigation={navigation} dest={'editName'} title={'이름'} hasContent={true} content={user.name} />
            <ListItemSetting navigation={navigation} dest={'editPassword'} title={'비밀번호 재설정'} hasContent={false} />
            <ListItemSetting navigation={navigation} dest={'withdrawal'} title={'회원탈퇴'} hasContent={false} />
          </Section>
          <Section>
            <Text style={styles.menu}>영적루틴관리</Text>
            <ListItemSetting navigation={navigation} dest={'myRoutines'} title={'나의 영적루틴'} hasContent={false} />
          </Section>
        </View>
        <SubmitButton onPress={onLogout} label={"로그아웃"}/>
      </View>
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'space-between',
    backgroundColor: colors.white, 
  },
  section: {
    backgroundColor: '#ffffff',
    width: '100%',
    paddingHorizontal: widthPercentage(spaces.m),
    paddingTop: heightPercentage(spaces.m),
    marginBottom: heightPercentage(spaces.xxs),
  },
  menu: {
    fontSize: fontPercentage(fontSize.medium),
    fontWeight: '300',
    marginBottom: heightPercentage(spaces.m),
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: heightPercentage(spaces.s),
  },
  title: {
    fontSize: fontPercentage(fontSize.menu),
    fontWeight: '300',
  },
  content: {
    fontSize: fontPercentage(fontSize.menu),
    fontWeight: '300',
  }

});

export default ProfileScreen;