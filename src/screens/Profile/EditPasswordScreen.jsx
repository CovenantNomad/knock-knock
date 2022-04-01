import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainContainer from '../../components/blocks/Containers/MainContainer';
import Header from '../../components/blocks/Header/Header';

const EditPasswordScreen = ({ navigation }) => {
  return (
    <MainContainer>
      <Header hasBackButton={true} navigation={navigation} goBack={true} title={"비밀번호변경"} />
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default EditPasswordScreen;