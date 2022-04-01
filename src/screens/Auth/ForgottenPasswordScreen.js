import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import auth from '@react-native-firebase/auth';
import { colors, fontPercentage, fontSize, heightPercentage, spaces, widthPercentage } from '../../theme/theme';
import { emailRegExp } from '../../utils/uitils';
//components
import Section from '../../components/atoms/Section/Section';
import MainContainer from '../../components/blocks/Containers/MainContainer';
import Header from '../../components/blocks/Header/Header';
import AuthButton from '../../components/atoms/Button/AuthButton';
import SimpleModal from '../../components/blocks/Modal/SimpleModal';

const ForgottenPasswordScreen = ({ navigation }) => {
  const { control, handleSubmit, watch, formState: { errors, isSubmitting }} = useForm();
  const [ showModal, setShowModal ] = useState(false)
  const [ modalMessage, setModalMessage ] = useState("")

  const onSubmit = async (data) => {
    await auth().sendPasswordResetEmail(data.email)
    setShowModal(true)
    setModalMessage(`${data.email}으로 메일을 발송하였습니다`)
  }

  return (
    <MainContainer>
      <Header hasBackButton={true} goBack={true} navigation={navigation} title={"비밀번호 찾기"}/>
      <Section>
        <Text style={styles.menu}>이메일</Text>
        <View style={styles.textinputWrapper}>
          <Controller 
            name="email"
            control={control}
            rules={{
              required:true,
              pattern: {
                value: emailRegExp,
                message: "이메일 형식 아닙니다"
              }
            }}
            render={({
              field: { onChange }}) => (
                <TextInput 
                  name="email"
                  onChangeText={onChange}
                  value={watch("email")}
                  keyboardType="email-address"
                  returnKeyType="next"
                  autoCapitalize='none'
                  selectionColor={colors.textInputSelect}
                  style={styles.textinput}
                  placeholder="이메일"
                />
              )}
            />
        </View>
        {errors.email && <Text style={styles.errorMsg}>{errors?.email?.message || "이메일을 입력해주세요"}</Text>}
        <Text style={styles.content}>{`입력하신 이메일 주소로\n비밀번호 재설정을 위한 메일을 발송해 드립니다.`}</Text>
        <AuthButton label={"이메일 발송하기"} onPress={handleSubmit(onSubmit)} />
      </Section>
      <SimpleModal show={showModal} setShow={setShowModal} message={modalMessage} />
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
    marginBottom: heightPercentage(spaces.xs),
  },
  content: {
    fontSize: fontPercentage(fontSize.medium),
    fontWeight: '500',
    lineHeight: fontPercentage(fontSize.title),
    marginBottom: heightPercentage(spaces.l),
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
    fontSize: fontPercentage(fontSize.large),
    paddingVertical: heightPercentage(spaces.xxs),
    width: '100%',
  },
  errorMsg: {
    width: '100%',
    marginTop: heightPercentage(-8),
    marginBottom: heightPercentage(16),
    color: 'red',
  },
});

export default ForgottenPasswordScreen;