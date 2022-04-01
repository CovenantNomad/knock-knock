import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import userStore from '../../store/store';
import { fontPercentage, fontSize, heightPercentage, spaces, widthPercentage } from '../../theme/theme';
// components
import MainContainer from '../../components/blocks/Containers/MainContainer';
import Header from '../../components/blocks/Header/Header';
import Section from '../../components/atoms/Section/Section';
import AuthButton from '../../components/atoms/Button/AuthButton';
import SimpleModal from '../../components/blocks/Modal/SimpleModal';

const ResetPasswordScreen = ({ navigation }) => {
  const user = userStore(state => state.currentUser)
  const [ showModal, setShowModal ] = useState(false)
  const [ modalMessage, setModalMessage ] = useState("")

  const onSubmit = async () => {
    await auth().sendPasswordResetEmail(user.email)
    setShowModal(true)
    setModalMessage(`${user.email}으로 메일을 발송하였습니다`)
  }

  return (
    <MainContainer>
      <Header hasBackButton={true} goBack={true} navigation={navigation} title={"비밀번호 재설정"} />
      <View style={styles.container}>
        <Section>
          <Text style={styles.menu}>{`가입하신 이메일 주소로\n비밀번호 재설정을 위한 메일을 발송해 드립니다.`}</Text>
          <AuthButton label={"이메일 발송하기"} onPress={onSubmit} />
        </Section>
        <SimpleModal show={showModal} setShow={setShowModal} message={modalMessage} />
      </View>
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  menu: {
    fontSize: fontPercentage(fontSize.medium),
    fontWeight: '500',
    lineHeight: fontPercentage(fontSize.title),
    marginBottom: heightPercentage(spaces.l),
  },
});

export default ResetPasswordScreen;