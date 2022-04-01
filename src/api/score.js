import firestore from '@react-native-firebase/firestore';
import { getDate } from '../utils/uitils';


export const createScore = async ({ uid, date }) => {
  const scoreRef = firestore().collection('users').doc(uid).collection('scores')
  return await scoreRef.where("date", "==", getDate(date)).get()
  .then(query => {
    if (query.empty) {
      firestore().collection('users').doc(uid).collection('scores').add({
        datetime: new Date(date.toISOString().substring(0, 10)),
        date: getDate(date),
        day: date.getDay(),
        userId: uid,
        score: 0
      })
    }
  })
}

export const updateScore = async ({ uid, date, score }) => {
  const scoreRef = firestore().collection('users').doc(uid).collection('scores').where("date", "==", getDate(date))
  return await scoreRef.get()
  .then((querySnapshot) => {
    querySnapshot.forEach(doc => {
      firestore().collection('users').doc(uid).collection('scores').doc(doc.id).update({
        score
      })
    })
  })
}

export const fetchScore = async ({ uid, start, end}) => {
  const scoreRef = firestore().collection('scores').where('datetime', '<', end).where('datetime', '>=', start).where('userId', '==', uid)
  return await scoreRef.get()
  .then((querySnapshot) => {
    temp = []
    querySnapshot.forEach((doc) => {
      console.log(doc.data())
    })
  })
}