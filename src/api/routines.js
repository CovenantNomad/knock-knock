import firestore from '@react-native-firebase/firestore';

export const createRoutine = async (newRoutine) => {
  await firestore().collection('users').doc(newRoutine.userId).collection('routines').get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      if (doc.data().title === newRoutine.title && doc.data().weekday === newRoutine.weekday) {
        console.log("이미 생성된 영적루틴입니다.")
        throw new Error("이미 생성된 영적루틴입니다.")
      }
    })
    return firestore().collection('users').doc(newRoutine.userId).collection('routines').add(newRoutine)
  })
}