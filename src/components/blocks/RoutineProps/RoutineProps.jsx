import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { fontPercentage, fontSize, heightPercentage, spaces, colors } from '../../../theme/theme';
// components
import Button from '../../atoms/Button/Button';

const RoutineProps = ({ state, setState }) => {
  const onPress = () => setState(!state)
  
  return (
    <>
      <Text style={styles.title}>루틴성격</Text>
      <View style={styles.container}>
        <Button label={"주님과의 교제"} onPress={onPress} isLeft={true} isSelect={state} />
        <Button label={"방해요소 제거"} onPress={onPress} isRight={true} isSelect={!state} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  title: {
    fontSize: fontPercentage(fontSize.medium),
    fontWeight: '500',
    marginBottom: heightPercentage(spaces.m),
  },
});

export default RoutineProps;