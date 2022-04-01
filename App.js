import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native'
import AppLoading from 'expo-app-loading';
import AsyncStorage from "@react-native-async-storage/async-storage";
import firestore from '@react-native-firebase/firestore';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LogBox } from 'react-native';
import Navigation from './src/navigations/Navigation';
import userStore from './src/store/store';
import SplashScreen from 'react-native-splash-screen';


const queryClient = new QueryClient();

export default function App() {
  LogBox.ignoreLogs([`[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!`]);
  const [ isReady, setIsReady ]= useState(false)
  const setUser = userStore(state => state.setCurrentUser)

  const preloadAssets = () => {
    const loadedAssets = [require('./assets/images/counting_stars.png'), require('./assets/images/honestday.jpeg'), require('./assets/images/prayforukraine.jpeg')]
    const promiseAssets = loadedAssets.map((asset) => Asset.loadAsync(asset))
    const loadedFont = [Ionicons.font]
    const promiseFonts = loadedFont.map((font) => Font.loadAsync(font))
    return Promise.all([promiseAssets, promiseFonts])
  }

  const startAsync = async () => {
    console.log("앱로딩 실행중")
    const token = await AsyncStorage.getItem("authentication");
    
    if (token) {
      console.log("토큰 가져옴")
      await firestore().collection('users').doc(token).get()
      .then((doc) => {
        if (doc.exists) {
          setUser({
            name: doc.data().name,
            email: doc.data().email,
            uid: token,
            isLoggedIn: true,
          })
          console.log("Success Getting UserInfo");
        } else {
          console.log("No user document!");
        }
        SplashScreen.hide()
      }).catch((error) => {
        console.log("@getUserInfo: ", error.message)
      })
    } else {
      console.log('토큰없음 - 로그인창으로')
      setUser({
        isLoggedIn: false,
      })
    }

    return preloadAssets();
  }

  if (!isReady) {
    return (
      <AppLoading 
        startAsync={startAsync}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    )
  }

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar barStyle='dark-content' backgroundColor={'#fff'} />
        <Navigation />
    </QueryClientProvider>
  );
}

