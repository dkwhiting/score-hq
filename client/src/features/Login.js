import React, {useState} from 'react'
import { View, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../app/userSlice'
import { useLoginMutation, useRegisterMutation } from '../app/shopAPI'
import {setUser} from '../app/userSlice'

export const Login = () => {
  const [loginUser] = useLoginMutation()
  const [registerUser] = useRegisterMutation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [login, setLogin] = useState(true)
  const dispatch = useDispatch()
  const currentUser = useSelector((state)=> state.user.currentUser)

  const clearForm = () =>{
    setName('')
    setEmail('')
    setPassword('')
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (!email || !password){
        setError('Please enter a valid username and password')
      } else {
        let response
        if (login) {
          response = await loginUser({email, password})
        } else {
          response = await registerUser({name, email, password})
        }
        if (response.error){
          setError(response.error.data.message)
        }
        if (response.data?.user){
          localStorage.setItem('currentUser', JSON.stringify(response.data.user))
          localStorage.setItem('token', response.data.token)
          dispatch(setUser(response.data.user))
          clearForm()
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View>
      <Text><h2>{login ? "Login" : "Register"}</h2></Text>
      <Text style={{color: 'red'}}>{error}</Text>
      <form onSubmit={(e)=>handleSubmit(e)}>
        
        {!login ?<input value={name} type='text' placeholder='Name' onChange={(e) => setName(e.target.value)} /> : null}
        <input value={email} type='text' placeholder='Email' onChange={(e) => setEmail(e.target.value) } />
        <input value={password} type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
        <button type='submit'>Submit</button>
      </form>
      {login
      ? <Text>
        Need an account?
        <a onClick={() => {setLogin(false); clearForm()}}> Click here to register.</a>
      </Text>
      : <Text>
        Already have an account?
        <a onClick={() => {setLogin(false); clearForm()}}> Click here to sign in.</a>
    </Text>
    }
    </View>
  )
}
