import React, {useState} from 'react'
import { View, Text, Button, TextInput } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../app/userSlice'
import { useLoginMutation, useRegisterMutation } from '../app/shopAPI'
import {setUser} from '../app/userSlice'
import { storeData, retrieveData, setData } from '../utils'
import Constants from "expo-constants";
const { manifest } = Constants;

const api = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
  ? manifest.debuggerHost.split(`:`).shift().concat(`:3000`)
  : `api.example.com`;

const Login = () => {
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
    console.log(api)
    try {
      if (!email || !password){
        setError('Please enter a valid username and password')
      } else {
        const body = {
          name,
          email,
          password
        }
        let response
        if (login) {
          response = await loginUser(body)
          console.log(response)
        } else {
          response = await registerUser(body)
          console.log(response)
        }
        if (response.error){
          console.log(response)
          // setError(response.error.data.message)
        }
        if (response.data?.user){
          setData('currentUser', JSON.stringify(response.data.user))
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
      <Text>{login ? "Login" : "Register"}</Text>
      <Text style={{color: 'red'}}>{error}</Text>        
        {!login ?<TextInput value={name} type='text' placeholder='Name' onChangeText={setName} /> : null}
        <TextInput value={email} type='text' placeholder='Email' onChangeText={setEmail} />
        <TextInput value={password} type='password' placeholder='Password' onChangeText={setPassword}/>
        <Button title="Submit" onPress={()=>handleSubmit()} />
      {login
      ? <Text>
        Need an account?
        
      </Text>
      : <Text>
        Already have an account?
        
    </Text>
    }
    </View>
  )
}

export default Login