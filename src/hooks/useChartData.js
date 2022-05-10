import React, { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { fetchScore } from '../api/score';
import userStore from '../store/store';
import { seperateWeekly, weekNumberByMonth } from '../utils/uitils';

const useChartData = (setHasError, setRecord) => {
  
  console.log(setHasError, setRecord)

  // try {
  //   const { result, payload, error } = useMemo(() => seperateWeekly(weekNo, data), [data])
  
  //   if (result) {
  //     const tempList = []

  //     for (const weeklyList of payload) {
  //       const weeklyTemp = [
  //         {
  //           day: 0,
  //           score: 0,
  //           total: 0,
  //           completed: 0,
  //           weekNo: 0,
  //         },
  //         {
  //           day: 1,
  //           score: 0,
  //           total: 0,
  //           completed: 0,
  //           weekNo: 0,
  //         },
  //         {
  //           day: 2,
  //           score: 0,
  //           total: 0,
  //           completed: 0,
  //           weekNo: 0,
  //         },
  //         {
  //           day: 3,
  //           score: 0,
  //           total: 0,
  //           completed: 0,
  //           weekNo: 0,
  //         },
  //         {
  //           day: 4,
  //           score: 0,
  //           total: 0,
  //           completed: 0,
  //           weekNo: 0,
  //         },
  //         {
  //           day: 5,
  //           score: 0,
  //           total: 0,
  //           completed: 0,
  //           weekNo: 0,
  //         },
  //         {
  //           day: 6,
  //           score: 0,
  //           total: 0,
  //           completed: 0,
  //           weekNo: 0,
  //         },
  //       ]
  //       weeklyList.data.forEach(item => {weeklyTemp.forEach((item2) => {
  //         if (item.day === item2.day) {
  //           item2.score = item.score,
  //           item2.total = item.total,
  //           item2.completed = item.completed
  //           item2.weekNo = item.weekNo
  //         }
  //       })})
  //       tempList.push(weeklyTemp)
  //     }
  //     setResult(tempList)
  //   } else {
  //     console.log(error)
  //     setHasError(true)
  //   }
  // } catch (error) {
  //   console.log(error)
  //   setHasError(true)
  // }
}

export default useChartData;