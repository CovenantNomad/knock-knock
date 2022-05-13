import firestore from '@react-native-firebase/firestore';
import { getDate, getMondayDate, getSundayDate } from '../utils/uitils';

export const createRecord = async ({ uid, date }) => {
  const recordRef = firestore().collection('users').doc(uid).collection('records')
  return await firestore().collection('users').doc(uid).collection('routines').where("weekday", "array-contains", date.getDay()).where("isActive", "==", true).get()
  .then((querySanpshot) => {
    querySanpshot.forEach((doc) => {
      recordRef.where("routineId", "==", doc.id).where("date", "==", getDate(date)).get()
      .then(query => {
        if (query.empty) {
          firestore().collection('users').doc(uid).collection('records').add({
            ...doc.data(),
            routineId: doc.id,
            datetime: new Date(date.toISOString().substring(0, 10)), 
            date: getDate(date),
            day: date.getDay(),
          })
        }
      })
    })
  })
}

export const fetchRecord = async ({ uid, date }) => {
  return await firestore().collection('users').doc(uid).collection('records').where("date", "==", getDate(date)).get()
  .then((querySnapshot) => {
    let temp = []
    querySnapshot.forEach((doc) => {
      temp.push({
        recordId: doc.id,
        ...doc.data()
      })
    })
    return temp
  })
}

export const updateRecordById = async ({ uid, docId, isCompleted }) => {
  return await firestore().collection('users').doc(uid).collection('records').doc(docId).update({
    isCompleted: !isCompleted
  })
}

export const updateCount = async ({ uid, docId, count }) => {
  return await firestore().collection('users').doc(uid).collection('records').doc(docId).update({
    count: +count + 1
  })
}

export const deleteRecordById = async ({ uid, docId }) => {
  return await firestore().collection('users').doc(uid).collection('records').doc(docId).delete()
}

export const fetchweeklyRecord = async ({ uid }) => {
  return await firestore().collection('users').doc(uid).collection('records').where("date", ">=", getDate(getMondayDate(new Date()))).where("date", "<=", getDate(getSundayDate(new Date()))).get()
  .then((querySnapshot) => {
    let temp = []
    querySnapshot.forEach((doc) => {
      temp.push({
        recordId: doc.id,
        ...doc.data()
      })
    })
    return temp
  })
}