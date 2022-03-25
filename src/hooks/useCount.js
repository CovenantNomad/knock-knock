import { useCallback, useMemo } from 'react';

const useCount = (routines) => {

  const counter = useCallback((routines) => {
    return routines?.filter(routine => routine.completed).length
  }, [routines])

  const completedCount = useMemo(() => counter(routines), [routines])

  const percentage = useMemo(() => {
    return (
      routines?.length !== 0 ? Math.ceil(completedCount / routines.length * 100) : 0
    )
  }, [completedCount])
  
  return [ percentage, completedCount ]
}

export default useCount;