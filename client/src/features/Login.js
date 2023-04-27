import React, {useState} from 'react'
import { View, Text, Button, TextInput, Pressable, Modal } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../app/userSlice'
import { useLoginMutation, useRegisterMutation } from '../app/shopAPI'
import {setUser} from '../app/userSlice'
import { storeData, retrieveData, setData } from '../utils'
import Loading from './Loading'


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
        console.log('we here bro')
        setErrorMessage('Please fill out all fields')
      } else {
        const body = {
          name,
          email,
          password
        }
        let response
        if (login) {
          response = await loginUser(body)

        } else {
          response = await registerUser(body)
        }
        if (response.error){
          setErrorMessage(response.error.data.message)
          setPassword('')
        }
        if (response.data?.user){
          setData('currentUser', JSON.stringify(response.data.user))
          setData('token', response.data.token)
          dispatch(setUser(response.data.user))
          clearForm()
        } else if (response.data?.message){
          setErrorMessage(response.data.message)
          setPassword('')
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View className="bg-white h-full px-6 justify-center">
      <View className="mb-5 flex flex-row justify-center">
        <Text className="font-bold text-center text-5xl text-fuchsia-800">
          SCORE 
        </Text>
        <Text className="text-center text-5xl text-emerald-700">
          HQ
        </Text>
      </View>
      {
        isLoading
        ? <Modal
            animationType="fade"
            transparent={true}
            visible={isLoading}
            className="bg-slate-900"
          >
            <Loading message={'Logging in...'}/>
          </Modal>
        : null
      }
        <View className="flex flex-col gap-2 items-center">
            <Text className="text-red-600 text-2xl">{login ? "Login" : "Register"}</Text>
            {error
            ? <Text className="text-red-600 text-center">{errorMessage}</Text>  
            : null
            }
            <View className="flex flex-col gap-3 items-center w-full">

              {!login 
                ?<TextInput className="w-full border-solid border-slate-400 border rounded-2xl px-3 py-2" value={name} type='text' placeholder='Name' onChangeText={setName} /> 
                : null
              }

              <TextInput className="w-full border-solid border-slate-400 border rounded-2xl px-3 py-2" value={email} type='text' placeholder='Email' onChangeText={setEmail} />
              <TextInput className="w-full border-solid border-slate-400 border rounded-2xl px-3 py-2" value={password} type='password' placeholder='Password' onChangeText={setPassword}/>
              <Pressable className="w-4/5 bg-red-400 flex align-center items-center rounded-2xl px-3 py-2" title="Submit" onPress={()=>handleSubmit()} >
                <Text className="text-white text-xl">Submit</Text>
              </Pressable>
            {
              login
              ? <View className="flex flex-row">
                  <Text className="text-lg">Don't have an account? </Text>
                  <Pressable onPress={()=>{setLogin(false); clearForm()}}>
                    <Text className="text-lg text-red-500">Sign up</Text>
                  </Pressable>
                </View>
              : <View className="flex flex-row">
                  <Text className="text-lg">Already have an account? </Text>
                  <Pressable onPress={()=>{setLogin(true); clearForm()}}>
                    <Text className="text-lg text-red-500">Sign In</Text>
                  </Pressable>
                </View>
            }
            </View>
          </View>
      
    </View>
  )
}

export default Login