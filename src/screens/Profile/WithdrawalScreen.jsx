import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import userStore from '../../store/store';
//components
import MainContainer from '../../components/blocks/Containers/MainContainer';
import Header from '../../components/blocks/Header/Header';
import SubmitButton from '../../components/atoms/Button/SubmitButton';
import { colors, fontPercentage, fontSize, heightPercentage, spaces, widthPercentage } from '../../theme/theme';
import ConfirmModal from '../../components/blocks/Modal/ConfirmModal';
import { withdrawal } from '../../api/auth';
import SimpleModal from '../../components/blocks/Modal/SimpleModal';

const WithdrawalScreen = ({ navigation }) => {
  const user = userStore(state => state.currentUser)
  const setUser = userStore(state => state.setCurrentUser)
  const [ visibleReset, setVisibleReset ] = useState(false)
  const [ visibleWithdrawal, setVisibleWithdrawal ] = useState(false)
  const [ showModal, setShowModal ] = useState(false)
  const [ modalMessage, setModalMessage ] = useState("")

  const toggleVisibleReset = () => setVisibleReset(!visibleReset)
  const toggleVisibleWithdrawal = () => setVisibleWithdrawal(!visibleWithdrawal)

  const resetPrimaryAction = () => {
    console.log('확인')
  }

  const resetSecondaryAction = () => {
    setVisibleReset(!visibleReset)
  }

  const withdrawalPrimaryAction = () => {
    const result = withdrawal()
    if (result) {
      setVisibleWithdrawal(false)
      setUser({
        isLoggedIn: false,
      })
    } else {
      setShowModal(true)
      setModalMessage("회원탈퇴에 실패했습니다.")
    }
  }

  const withdrawalSecondaryAction = () => {
    setVisibleWithdrawal(!visibleWithdrawal)
  }

  return (
    <MainContainer>
      <Header hasBackButton={true} title={"회원탈퇴"} navigation={navigation} goBack={true}/>
      <View style={styles.container}>
        <View>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>{`${user.name}님,\n정말 계정을 삭제하실껀가요?`}</Text>
            <Text style={styles.subtitle}>{`계정을 삭제하면\n${user.name}님이 생성한 루틴과 기록이\n모두 사라지게 됩니다.`}</Text>
          </View>
          <View style={styles.resetContainer}>
            <Text style={styles.alram}>{`데이터만 지우고\n새로 시작하고 싶으시면 리셋해주세요`}</Text>
            <View style={{ flexDirection: 'row', justifyContent:'space-between', marginTop: heightPercentage(spaces.m)}}>
              <Text style={styles.warning}>리셋하기 - 모든데이터 지우기</Text>
              <TouchableOpacity onPress={toggleVisibleReset}>
                <Text style={styles.warning}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <SubmitButton onPress={toggleVisibleWithdrawal} label={"회원탈퇴"}/>
        <ConfirmModal visible={visibleReset} toggleDialog={toggleVisibleReset} title={'리셋하기'} content={"정말 모든 데이터를 삭제하시겠습니까?"} primaryAction={resetPrimaryAction} secondaryAction={resetSecondaryAction}/>
        <ConfirmModal visible={visibleWithdrawal} toggleDialog={toggleVisibleWithdrawal} title={'회원탈퇴'} content={"정말 회원탈퇴를 하시겠습니까?"} primaryAction={withdrawalPrimaryAction} secondaryAction={withdrawalSecondaryAction}/>
        <SimpleModal show={showModal} setShow={setShowModal} message={modalMessage} />
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
  contentContainer: {
    alignItems: 'center',
    marginTop: heightPercentage(spaces.l),
  },
  resetContainer: {
    backgroundColor: colors.gray300,
    marginTop: heightPercentage(spaces.xxl),
    marginHorizontal: widthPercentage(spaces.m),
    paddingHorizontal: widthPercentage(spaces.m),
    paddingVertical: heightPercentage(spaces.s),
    borderRadius: 12,
  },
  title: {
    fontSize: fontPercentage(fontSize.title),
    textAlign: 'center',
    marginBottom: heightPercentage(spaces.l),
  },
  subtitle: {
    fontSize: fontPercentage(fontSize.medium),
    textAlign: 'center'
  },
  alram: {
    fontSize: fontPercentage(fontSize.medium),
    color: colors.gray700,
  },
  warning: {
    fontSize: fontPercentage(fontSize.medium),
    color: colors.warning,
    fontWeight: '900'
  }
});

export default WithdrawalScreen;