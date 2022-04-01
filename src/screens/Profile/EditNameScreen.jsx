import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
// components
import MainContainer from '../../components/blocks/Containers/MainContainer';
import Header from '../../components/blocks/Header/Header';
import AuthButton from '../../components/atoms/Button/AuthButton';
import SimpleModal from '../../components/blocks/Modal/SimpleModal';
import { colors, fontPercentage, fontSize, heightPercentage, spaces, widthPercentage } from '../../theme/theme';
import { useMutation } from 'react-query';
import { updateName } from '../../api/auth';
import userStore from '../../store/store';
import firestore from '@react-native-firebase/firestore';

const EditNameScreen = ({ navigation, route }) => {
  const user = userStore(state => state.currentUser)
  const setUser = userStore(state => state.setCurrentUser)
  const { content : originalName } = route.params
  const { control, handleSubmit, watch, formState: { errors, isSubmitting }} = useForm();
  const [ showModal, setShowModal ] = useState(false)
  const [ modalMessage, setModalMessage ] = useState("")

  const updateNameMutation = useMutation(updateName)

  const onSubmit = async (data) => {
    if (originalName != data.name) {
      try {
        await updateNameMutation.mutateAsync({uid: user.uid, updateName: data.name})
        setUser({
          ...user,
          name: data.name
        })
        setShowModal(true)
        setModalMessage("이름이 변경되었습니다")
      } catch (errors) {
        console.log(errors)
        setShowModal(true)
        setModalMessage("실패! 이름을 실패했습니다")
      }
    } else {
      setShowModal(true)
      setModalMessage("원래 이름과 다른이름을 입력해주세요")
    }
  }

  return (
    <MainContainer>
      <Header navigation={navigation} hasBackButton={true} goBack={true} title={"이름 수정"} />
      <View style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.menu}>이름</Text>
            <View style={styles.textinputWrapper}>
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
                    selectionColor={colors.textInputSelect}
                    style={styles.textinput}
                    placeholder={originalName}
                  />
                )}
              />
          </View>
          {errors.name && <Text style={styles.errorMsg}>{errors?.name?.message || "이름을 입력해주세요"}</Text>}
          <View style={{ marginTop: heightPercentage(spaces.l)}}>
            <AuthButton label="수정하기" onPress={handleSubmit(onSubmit)} loading={isSubmitting} />
          </View>
          <SimpleModal show={showModal} setShow={setShowModal} message={modalMessage} />
        </View>
      </View>
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
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

export default EditNameScreen;