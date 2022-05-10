import React, { useState, useCallback } from 'react';

const useSelectWeekday = () => {
  const [ weekdays, setWeekdays ] = useState([
    {
      id: 0,
      title: '일',
      select: false
    },
    {
      id: 1,
      title: '월',
      select: false
    },
    {
      id: 2,
      title: '화',
      select: false
    },
    {
      id: 3,
      title: '수',
      select: false
    },
    {
      id: 4,
      title: '목',
      select: false
    },
    {
      id: 5,
      title: '금',
      select: false
    },
    {
      id: 6,
      title: '토',
      select: false
    },
  ])

  const onToggleSelected = (id) => {
    setWeekdays(
      weekdays.map(weekday =>
        weekday.id === id ? {...weekday, select: !weekday.select} : weekday
      )
    )
  }

  return [ weekdays, setWeekdays, onToggleSelected ]
}

export default useSelectWeekday;