import React, {useState} from 'react'
import { View, Text, Button, TextInput } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../app/userSlice'
import { useLoginMutation, useRegisterMutation } from '../app/shopAPI'
import {setUser} from '../app/userSlice'
import { storeData, retrieveData, setData } from '../utils'


const Login = ({user}) => {
  const [loginUser, {isLoading, error}] = useLoginMutation()
  const [registerUser] = useRegisterMutation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('jobin@fake.com')
  const [password, setPassword] = useState('password')
  const [errorMessage, setErrorMessage] = useState('')
  const [login, setLogin] = useState(true)
  const dispatch = useDispatch()
  const currentUser = useSelector((state)=> state.user.currentUser)

  const clearForm = () =>{
    setName('')
    setEmail('')
    setPassword('')
    setErrorMessage('')
  }

  const handleSubmit = async (e) => {
    try {
      if (!email || !password){
        setErrorMessage('Please enter a valid username and password')
      } else {
        const body = {
          name,
          email,
          password
        }
        let response
        if (login) {
          console.log('LOGGING IN')
          response = await loginUser(body)
          console.log(error)
          console.log(response)
        } else {
          response = await registerUser(body)
        }
        if (response.error){
          setErrorMessage(response.error.data.message)
        }
        if (response.data?.user){
          setData('currentUser', JSON.stringify(response.data.user))
          setData('token', response.data.token)
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
      {
        isLoading
        ? <Text>LOGGING IN...</Text>
        : <>
        
      <Text>{login ? "Login" : "Register"}</Text>
      <Text style={{color: 'red'}}>{errorMessage}</Text>        
        {error ? <Text style={{color: 'red'}}>{error.status}{JSON.stringify(error.data)}</Text> : null }   
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
    </>
  }
    </View>
  )
}

export default Login