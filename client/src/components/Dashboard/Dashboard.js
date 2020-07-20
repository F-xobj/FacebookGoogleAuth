import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSecret } from '../../Redux/actions/index'
const Dashboard = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getSecret())
  }, [])
  const secret = useSelector((state) => state.dashboard.secret)
  return <>{secret}</>
}
export default Dashboard
