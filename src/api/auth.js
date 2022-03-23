import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';


export const createUser = async (user) => {

  try {
    console.log("회원가입 시작")
    await auth().createUserWithEmailAndPassword(user.email, user.password)
    const uid = auth().currentUser.uid;


    await firestore().collection("users").doc(uid).set({
      name: user.name,
      email: user.email,
    })

    delete user.password;

    return {
      response: true,
      message: `회원가입 되었습니다\n로그인 하러가기`
    }
  } catch (error) {

    if (error.code === 'auth/email-already-in-use') {
      return {
        response: false,
        message: '이미 가입하신 이메일이 있습니다'
      }
    }

    if (error.code === 'auth/invalid-email') {
      return {
        response: false,
        message: '이메일 주소가 올바르지 않습니다'
      }
    }

    console.log("Error: @createUser: ", error.message)
  }
}

export const signIn = async (email, password) => {
  return await auth().signInWithEmailAndPassword(email, password)
}

export const logOut = async () => {
  try {
    await auth().signOut();

    return true;

  } catch (error) {
    console.log("Error @logOut: ", error)
  }

  return false;
}

export const getCurrentUser = () => {
  return auth().currentUser
}


export const getUserInfo = async (uid) => {
  try {
    const user = await firestore().collection('users').doc(uid).get()
    if (user.exists) {
      return user.data()
    }
  } catch (error) {
    console.log("Error @getUserInfo: ", error)
  }
}