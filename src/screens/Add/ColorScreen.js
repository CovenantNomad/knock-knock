import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colorSelection } from '../../data/colorSelection';
import routineStore from '../../store/routineStore';
//components
import MainContainer from '../../components/blocks/Containers/MainContainer';
import Header from '../../components/blocks/Header/Header';
import SubmitButton from '../../components/atoms/Button/SubmitButton';
import { fontPercentage, fontSize, heightPercentage, spaces, widthPercentage } from '../../theme/theme';

const ColorScreen = ({ navigation }) => {
  const color = routineStore(state => state.selectColor)
  const setColor = routineStore(state => state.setSelectColor)

  const renderColors = ({ item }) => {
    return (
      <TouchableOpacity
        key={item} 
        style={[styles.selector, { backgroundColor: item, marginRight: widthPercentage(12) }]} 
        onPress={() => {setColor(item)}}
      />
    )
  }

  return (
    <MainContainer>
      <Header hasBackButton={true} title={"색상 선택"} navigation={navigation} route="createRoutine"/>
      <View style={styles.body}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: heightPercentage(spaces.m) }}>
          <Text style={{ flex: 1, fontSize: fontPercentage(fontSize.medium), fontWeight: '800' }}>선택한 색상</Text>
          <View style={{ width: widthPercentage(40), height: heightPercentage(40), borderRadius: 12, backgroundColor: color, marginRight: widthPercentage(4) }}></View>
        </View>
        <FlatList 
          data={colorSelection}
          keyExtractor={item => item}
          renderItem={renderColors}
          horizontal={false}
          numColumns={7}
          // contentContainerStyle={{ backgroundColor: 'blue'}}
        />
        <View style={{ justifyContent: 'flex-end', marginBottom: heightPercentage(60)}}>
          <SubmitButton label={"선택"} onPress={() => navigation.navigate("createRoutine")}/>
        </View>
      </View>
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#ffffff',
    width: '100%',
    paddingHorizontal: widthPercentage(spaces.m),
    paddingTop: heightPercentage(spaces.m),
    marginBottom: heightPercentage(spaces.xxs),
    borderColor: '#EBF2FF',
    borderWidth: 1,
    borderStyle: 'solid',
    paddingHorizontal: widthPercentage(16),
    height: '100%',
  },
  selector: {
    width: widthPercentage(40),
    height: heightPercentage(40),
    borderRadius: 12,
    marginBottom: heightPercentage(spaces.m),
  },
});

export default ColorScreen;