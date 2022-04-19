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

export const findAllRoutine = async ({ uid, filter }) => {
  let routineRef
  if (filter === 'isActive') {
    routineRef = firestore().collection('users').doc(uid).collection('routines').where("isActive", "==", true )
  } else if (filter === 'isNotActive') {
    routineRef = firestore().collection('users').doc(uid).collection('routines').where("isActive", "!=", true )
  } else {
    routineRef = firestore().collection('users').doc(uid).collection('routines')
  }
  return await routineRef.get()
  .then((querySnapshot) => {
    temp = []
    querySnapshot.forEach((doc) => {
      temp.push({
        routineId: doc.id,
        ...doc.data()
      })
    })
    return temp
  })
}