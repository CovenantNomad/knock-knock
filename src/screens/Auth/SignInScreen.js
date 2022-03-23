import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Icon } from 'react-native-elements'
import { useForm, Controller } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
// API
import { signIn, getUserInfo } from '../../api/auth';
// State
import useStore from '../../store/store';
//Components
import AuthContainer from '../../components/blocks/Containers/AuthContainer';
import SimpleModal from '../../components/blocks/Modal/SimpleModal';
import Button from '../../components/atoms/Button/Button';
import { emailRegExp } from '../../utils/uitls';

import { colors, fontPercentage, heightPercentage, widthPercentage } from '../../theme/theme';

const SignInScreen = ({ navigation }) => {
  const [ loading, setLoading ] = useState(false)
  const [ showModal, setShowModal ] = useState(false)
  const [ modalMessage, setModalMessage ] = useState(false)
  const { control, handleSubmit, watch, formState: { errors }} = useForm()
  const setCurrentUserState = useStore((state) => state.setCurrentUser);

  const emailRef = useRef()
  const passwordRef = useRef()
  const moveToNext = (nextRef) => {
    nextRef?.current?.focus()
  }

  const onSubmit = async (data) => {
    setLoading(true)

    const { email, password } = data

    try {
      const userCredential = await signIn(email, password)
      const uid = userCredential.user.uid
      const userInfo = await getUserInfo(uid)
      await AsyncStorage.setItem('token', uid)
      setCurrentUserState({
        name: userInfo.name,
        email: userInfo.email,
        uid,
        profilePhotoUrl: userInfo.profilePhotoUrl,
        isLoggedIn: true,
      })
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setModalMessage("가입되지 않은 메일입니다")
        setShowModal(true)
      }
      if (error.code === 'auth/wrong-password') {
        setModalMessage("비밀번호가 틀렸습니다")
        setShowModal(true)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContainer>
      <View style={styles.header}>
        <Icon 
          name='md-chevron-back-outline'
          type='ionicon'
          size={36}
          style={{ marginLeft: widthPercentage(-8) }}
          containerStyle={{ marginRight: widthPercentage(8) }}
          onPress={() => navigation.goBack()}
          />
        <Text style={styles.title}>이메일로 로그인</Text>
      </View>
      <View style={styles.signupTextInputWrapper}>
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
                ref={emailRef}
                onChangeText={onChange}
                value={watch("email")}
                keyboardType="email-address"
                returnKeyType="next"
                autoCapitalize='none'
                onSubmitEditing={()=>moveToNext(passwordRef)}
                selectionColor={colors.textInputSelect}
                style={styles.signupTextInput}
                placeholder="이메일"
              />
            )}
          />
      </View>
      {errors.email && <Text style={styles.errorMsg}>{errors?.email?.message || '이메일을 확인해주세요'}</Text>}
      <View style={styles.signupTextInputWrapper}>
        <Controller 
          name="password"
          control={control}
          rules={{
            required:true
          }}
          render={({
            field: { onChange }}) => (
              <TextInput 
                name="password"
                ref={passwordRef}
                onChangeText={onChange}
                value={watch("password")}
                returnKeyType="done"
                autoCapitalize='none'
                secureTextEntry
                onSubmitEditing={handleSubmit(onSubmit)}
                selectionColor={colors.textInputSelect}
                style={styles.signupTextInput}
                placeholder="비밀번호"
              />
            )}
          />
        </View>
      {errors.password && <Text style={styles.errorMsg}>{errors?.password?.message || '비밀번호를 입력해주세요'}</Text>}
      <View style={styles.footer}>
        <Button label="로그인" onPress={handleSubmit(onSubmit)} loading={loading}/>
        <Text 
          style={styles.forgotPW}
          onPress={() => navigation.navigate("forgottenPassword")}
        >
          비밀번호 찾기
        </Text>
      </View>  
      <SimpleModal show={showModal} setShow={setShowModal} message={modalMessage}/>
    </AuthContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: heightPercentage(12),
    marginBottom: heightPercentage(20),
  },
  title: {
    fontSize: fontPercentage(24),
    fontWeight: '700'
  },
  signupTextInputWrapper: {
    position: 'relative',
    width: '100%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: heightPercentage(16),
    paddingHorizontal: widthPercentage(10),
    paddingVertical: heightPercentage(6),
    borderBottomColor: '#222',
    borderBottomWidth: 1,
  },
  signupTextInput: {
    width: '85%',
    fontSize: fontPercentage(16),
    paddingVertical: heightPercentage(6),
  },
  errorMsg: {
    width: '100%',
    marginTop: heightPercentage(-8),
    marginBottom: heightPercentage(16),
    color: 'red',
  },
  footer: {
    width: '100%',
    marginTop: heightPercentage(32),
  },
  forgotPW: {
    textAlign: 'center',
    marginVertical: heightPercentage(16),
    color: '#888888',
    fontSize: fontPercentage(16),
  },
});

export default SignInScreen;