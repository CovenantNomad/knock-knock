import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Icon } from 'react-native-elements'
import { emailRegExp } from '../../utils/uitils';
// api
import { createUser } from '../../api/auth';
// components
import AuthContainer from '../../components/blocks/Containers/AuthContainer';
import Button from '../../components/atoms/Button/Button';
import AuthModal from '../../components/blocks/Modal/AuthModal';
import { colors, fontPercentage, heightPercentage, spaces, widthPercentage } from '../../theme/theme';



const SignUpScreen = ({ navigation }) => {
  const [ loading, setLoading ] = useState(false);
  const [ showModal, setShowModal ] = useState(false)
  const [ response, setResponse ] = useState("")
  const { control, handleSubmit, watch, formState: { errors }, getValues} = useForm();

  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const moveToNext = (nextRef) => {
    nextRef?.current?.focus()
  }

  const onSubmit = async (data) => {
    setLoading(true)

    console.log("진입점")

    delete data.passwordConfirm

    const user = {...data}

    try {
      result = await createUser(user)
      setResponse(result)
      setShowModal(true)
    } catch (error) {
      console.log("Error @signUp: ", error)
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
          size={40}
          style={{ marginLeft: widthPercentage(-8) }}
          containerStyle={{ marginRight: widthPercentage(8) }}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title}>회원가입</Text>
      </View>
      <View style={styles.signupSection}>
        <View style={styles.signupTextInputWrapper}>
          <Controller 
            name="name"
            control={control}
            rules={{
              required:true,
            }}
            render={({
              field: { onChange }}) => (
                <TextInput 
                  name="name"
                  onChangeText={onChange}
                  value={watch("name")}
                  keyboardType="default"
                  returnKeyType="next"
                  autoCapitalize='none'
                  onSubmitEditing={()=>moveToNext(emailRef)}
                  selectionColor={colors.textInputSelect}
                  style={styles.signupTextInput}
                  placeholder="이름"
                />
              )}
            />
        </View>
        {errors.name && <Text style={styles.errorMsg}>{errors?.name?.message || "이름을 입력해주세요"}</Text>}
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
        {errors.email && <Text style={styles.errorMsg}>{errors?.email?.message || "이메일을 입력해주세요"}</Text>}
        <View style={styles.signupTextInputWrapper}>
          <Controller 
            name="password"
            control={control}
            rules={{
              required: true,
              minLength: {
                value: 8,
                message: "8자리이상 해주세요"
              }
            }}
            render={({
              field: { onChange }}) => (
                <TextInput 
                  name="password"
                  ref={passwordRef}
                  onChangeText={onChange}
                  value={watch("password")}
                  returnKeyType="next"
                  autoCapitalize='none'
                  secureTextEntry
                  onSubmitEditing={()=>moveToNext(passwordConfirmRef)}
                  selectionColor={colors.textInputSelect}
                  style={styles.signupTextInput}
                  placeholder="비밀번호"
                />
              )}
            />
          </View>
        {errors.password && <Text style={styles.errorMsg}>{errors?.password?.message || "비밀번호를 입력해주세요"}</Text>}
        <View style={styles.signupTextInputWrapper}>
          <Controller 
            name="passwordConfirm"
            control={control}
            rules={{
              required: true,
              validate: value => value === watch("password") || "비밀번호가 일치하지 않습니다"
            }}
            render={({
              field: { onChange }}) => (
                <TextInput 
                  name="passwordConfirm"
                  ref={passwordConfirmRef}
                  onChangeText={onChange}
                  value={watch("passwordConfirm")}
                  returnKeyType="done"
                  autoCapitalize='none'
                  secureTextEntry
                  onSubmitEditing={handleSubmit(onSubmit)}
                  selectionColor={colors.textInputSelect}
                  style={styles.signupTextInput}
                  placeholder="비밀번호 확인"
                />
              )}
            />
          </View>
        {errors.passwordConfirm && <Text style={styles.errorMsg}>{errors?.passwordConfirm?.message || '비밀번호를 한번 더 입력해주세요'}</Text>}
        <View style={styles.footer}>
          <Button label="회원가입" onPress={handleSubmit(onSubmit)} loading={loading} />
        </View>  
        <AuthModal show={showModal} setShow={setShowModal} response={response} navigation={navigation}/>
      </View>
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
    marginBottom: heightPercentage(spaces.s),
  },
  title: {
    fontSize: fontPercentage(24),
    fontWeight: '700'
  },
  signupSection: {
    width: '100%',
    flex: 1,
    paddingTop: heightPercentage(spaces.s),
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
});

export default SignUpScreen;