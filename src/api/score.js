import firestore from '@react-native-firebase/firestore';
import { getDate, weekNumberByMonth } from '../utils/uitils';


export const createScore = async ({ uid, date, score, total, completed }) => {
  const { year, month, weekNo } = weekNumberByMonth(date)
  const scoreRef = firestore().collection('users').doc(uid).collection('scores')
  return await scoreRef.where("date", "==", getDate(date)).get()
  .then(query => {
    if (query.empty) {
      firestore().collection('users').doc(uid).collection('scores').add({
        datetime: new Date(date.toISOString().substring(0, 10)),
        year,
        month,
        weekNo,
        date: getDate(date),
        day: date.getDay(),
        userId: uid,
        score,
        completed,
        total,
      })
    }
  })
}

export const updateScore = async ({ uid, date, score, total, completed }) => {
  const scoreRef = firestore().collection('users').doc(uid).collection('scores').where("date", "==", getDate(date))
  return await scoreRef.get()
  .then((querySnapshot) => {
    querySnapshot.forEach(doc => {
      firestore().collection('users').doc(uid).collection('scores').doc(doc.id).update({
        score,
        total,
        completed
      })
    })
  })
}

export const fetchScore = async ({uid, year, month}) => {
  const scoreRef = firestore().collection('users').doc(uid).collection('scores').where("month", "==", month).where("year", "==", year)
  return await scoreRef.get()
  .then((querySnapshot) => {
    temp = []
    querySnapshot.forEach((doc) => {
      temp.push(doc.data())
    })
    return temp
  })
}