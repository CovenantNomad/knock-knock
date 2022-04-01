import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dialog } from 'react-native-elements';

const ConfirmModal = ({ visible, toggleDialog, title, content, primaryAction, secondaryAction }) => {
  return (
    <Dialog
      isVisible={visible}
      onBackdropPress={toggleDialog}
    >
      <Dialog.Title title={title}/>
      <Text>{content}</Text>
      <Dialog.Actions>
        <Dialog.Button title="확인" onPress={primaryAction}/>
        <Dialog.Button title="취소" onPress={secondaryAction}/>
      </Dialog.Actions>
    </Dialog>
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

export default ConfirmModal;