import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'


const AuthRoute = ({children}) => {
  const user = useSelector(state => state.user.currentUser)

  console.log(!!user)

  if(!user){
    //Not signed in
    return <Navigate to="/login" />
  }
  //Signed in
  return children
}

export default AuthRoute