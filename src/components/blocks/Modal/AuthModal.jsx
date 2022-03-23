import React from 'react';
import { StyleSheet, Text, View, Modal, Pressable } from 'react-native';
import { colors } from '../../../theme/theme';

const AuthModal = ({show, setShow, response, navigation}) => {

  const onPress = () => {
    if (response.response) {
      setShow(false)
      navigation.navigate("signin")
    } else {
      setShow(false)
    }
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={show}
      onRequestClose={() => {
        setShow(!modalVisible);
      }}
    >
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        {response.response ? (
          <Text style={styles.resultText}>회원가입 성공</Text>
        ) : (
          <Text style={styles.resultText}>회원가입 실패</Text>
        )}
        <Text style={styles.modalText}>{response.message}</Text>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => onPress()}
        >
          <Text style={styles.textStyle}>확인</Text>
        </Pressable>
      </View>
    </View>
  </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    minWidth: '75%',
    minHeight: '20%',
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 8,
    paddingHorizontal: 30,
    paddingVertical: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: colors.button,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center",
    fontWeight: '600',
    fontSize: 16,
  },
  resultText: {
    marginBottom: 8,
    textAlign: "center",
    fontWeight: '700',
    fontSize: 20,
    color: colors.warning,
  }
});

export default AuthModal;