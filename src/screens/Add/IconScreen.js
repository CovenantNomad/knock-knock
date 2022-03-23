import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { icons } from '../../data/iconSelection';
import routineStore from '../../store/routineStore';
// components
import MainContainer from '../../components/blocks/Containers/MainContainer';
import Header from '../../components/blocks/Header/Header';
import SubmitButton from '../../components/atoms/Button/SubmitButton';
import { fontPercentage, fontSize, heightPercentage, spaces, widthPercentage } from '../../theme/theme';

const IconScreen = ({ navigation }) => {
  const selectIcon = routineStore(state => state.selectIcon)
  const setSelectIcon = routineStore(state => state.setSelectIcon)

  const renderIcons = ({ item }) => {
    return (
      <Icon
        name={item}
        type='font-awesome-5'
        containerStyle={[styles.icon, {backgroundColor: '#F5F5F5', borderColor: item === selectIcon ? '#1572A1': "", borderWidth: item === selectIcon ? 3 : 0}]}
        key={item} 
        onPress={()=>{setSelectIcon(item)}}
      />
    )
  }

  return (
    <MainContainer>
      <Header hasBackButton={true} title={"아이콘 선택"} navigation={navigation} route="createRoutine"/>
      <View style={styles.body}>
        <FlatList 
          data={icons}
          keyExtractor={item => item}
          renderItem={renderIcons}
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
  icon: {
    width: widthPercentage(40),
    height: heightPercentage(40),
    borderRadius: 20, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: widthPercentage(spaces.s),
    marginBottom: heightPercentage(spaces.m),
  },
});

export default IconScreen;