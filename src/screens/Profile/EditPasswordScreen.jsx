import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import userStore from '../../store/store';
import { colors, fontPercentage, fontSize, heightPercentage, widthPercentage, spaces } from '../../theme/theme';
// components
import MainContainer from '../../components/blocks/Containers/MainContainer';
import Header from '../../components/blocks/Header/Header';
import AuthButton from '../../components/atoms/Button/AuthButton';
import SimpleModal from '../../components/blocks/Modal/SimpleModal';

const EditPasswordScreen = ({ navigation }) => {
  const user = userStore(state => state.currentUser)
  const { control, handleSubmit, watch, formState: { errors, isSubmitting }} = useForm();
  const [ showModal, setShowModal ] = useState(false)
  const [ modalMessage, setModalMessage ] = useState("")

  const newPasswordRef = useRef()
  const newPasswordConfirmRef = useRef()
  const moveToNext = (nextRef) => {
    nextRef?.current?.focus()
  }

  const onSubmit = async (data) => {
    console.log(data)
  }

  return (
    <MainContainer>
      <Header hasBackButton={true} navigation={navigation} goBack={true} title={"비밀번호변경"} />
      <View style={styles.section}>
        <Text style={styles.menu}>기존 비밀번호</Text>
        <View style={styles.textinputWrapper}>
          <Controller 
            name="originPassword"
            control={control}
            rules={{
              required: true,
              minLength: {
                value: 8,
                message: "8자리이상 해주세요"
              },

            }}
            render={({
              field: { onChange }}) => (
                <TextInput
                  name="originPassword"
                  onChangeText={onChange}
                  value={watch("originPassword")}
                  returnKeyType="next"
                  autoCapitalize='none'
                  secureTextEntry
                  onSubmitEditing={() => moveToNext(newPasswordRef)}
                  selectionColor={colors.textInputSelect}
                  style={styles.textinput}
                />
              )}
            />
        </View>
        {errors.originPassword && <Text style={styles.errorMsg}>{errors?.originPassword?.message || "기존 비밀번호를 입력해주세요"}</Text>}
        <Text style={styles.menu}>신규 비밀번호</Text>
        <View style={styles.textinputWrapper}>
          <Controller 
            name="newPassword"
            control={control}
            rules={{
              required: true,
              minLength: {
                value: 8,
                message: "8자리이상 해주세요"
              },
              validate: value => value === watch("originPassword") || "기존 비밀번호와 같습니다",
            }}
            render={({
              field: { onChange }}) => (
                <TextInput
                  name="newPassword"
                  onChangeText={onChange}
                  ref={newPasswordRef}
                  value={watch("newPassword")}
                  returnKeyType="next"
                  autoCapitalize='none'
                  secureTextEntry
                  onSubmitEditing={() => moveToNext(newPasswordConfirmRef)}
                  selectionColor={colors.textInputSelect}
                  style={styles.textinput}
                />
              )}
            />
        </View>
        {errors.newPassword && <Text style={styles.errorMsg}>{errors?.newPassword?.message || "신규 비밀번호를 입력해주세요"}</Text>}
        <Text style={styles.menu}>신규 비밀번호 확인</Text>
        <View style={styles.textinputWrapper}>
          <Controller 
            name="newPasswordConfirm"
            control={control}
            rules={{
              required: true,
              minLength: {
                value: 8,
                message: "8자리이상 해주세요"
              },
              validate: value => value === watch("newPassword") || "신규 비밀번호와 일치하지 않습니다",
            }}
            render={({
              field: { onChange }}) => (
                <TextInput
                  name="newPasswordConfirm"
                  onChangeText={onChange}
                  ref={newPasswordConfirmRef}
                  value={watch("newPasswordConfirm")}
                  returnKeyType="next"
                  autoCapitalize='none'
                  secureTextEntry
                  selectionColor={colors.textInputSelect}
                  style={styles.textinput}
                />
              )}
            />
        </View>
        {errors.newPasswordConfirm && <Text style={styles.errorMsg}>{errors?.newPasswordConfirm?.message || "신규 비밀번호를 한번 더 입력해주세요"}</Text>}
        <View style={{ marginTop: heightPercentage(spaces.l)}}>
          <AuthButton label="수정하기" onPress={handleSubmit(onSubmit)} loading={isSubmitting} />
        </View>
        <SimpleModal show={showModal} setShow={setShowModal} message={modalMessage} />
      </View>
    </MainContainer>
  );
}

const styles = StyleSheet.create({
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

export default EditPasswordScreen;