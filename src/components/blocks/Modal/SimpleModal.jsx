import React from 'react';
import { StyleSheet, Text, View, Modal, Pressable } from 'react-native';

const SimpleModal = ({show, setShow, message}) => {
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
        <Text style={styles.modalText}>{message}</Text>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => setShow(!show)}
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
    minHeight: '15%',
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
    backgroundColor: "#0A1931",
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
  }
});

export default SimpleModal;