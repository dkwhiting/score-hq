import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLoginMutation, useRegisterMutation } from '../app/shopAPI'
import {setUser} from '../app/userSlice'
import { removeData, retrieveData, setData } from '../utils'
import Loading from './Loading'
import { redirect, useNavigate } from 'react-router-dom'


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
  const navigate = useNavigate()

  useEffect(()=>{
    if (user) {
      navigate("/dashboard")
    }
  }, [])

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
          console.log(response)

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
          navigate("/dashboard")
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
    <div className="flex flex-col flex-1 px-6 items-align justify-center">
      <div className="mb-5 flex flex-row justify-center">
        <p className="font-bold text-center text-5xl text-fuchsia-800">
          SCORE 
        </p>
        <p className="text-center text-5xl text-emerald-700">
          HQ
        </p>
      </div>
      {
        isLoading
        ? <div className="absolute w-full h-full top-0 left-0">
          <Loading message="Logging In" />
        </div>
        : null
      }
        <div className="flex flex-col gap-2 items-center">
            <p className="text-red-600 text-2xl">{login ? "Login" : "Register"}</p>
            {error
            ? <p className="text-red-600 text-center">{errorMessage}</p>  
            : null
            }
            <div className="flex flex-col gap-3 items-center w-full">

              {!login 
                ?<input className="w-full border-solid border-slate-400 border rounded-2xl px-3 py-2" value={name} type='text' placeholder='Name' onChange={e =>setName(event.target.value)} /> 
                : null
              }

              <input className="w-full border-solid border-slate-400 border rounded-2xl px-3 py-2" value={email} type='text' placeholder='Email' onChange={e =>setEmail(event.target.value)} />
              <input className="w-full border-solid border-slate-400 border rounded-2xl px-3 py-2" value={password} type='password' placeholder='Password' onChange={e =>setPassword(event.target.value)}/>
              <button className="w-4/5 bg-red-400 flex align-center items-center rounded-2xl px-3 py-2" title="Submit" onClick={()=>handleSubmit()} >
                <p className="text-white text-xl">Submit</p>
              </button>
            {
              login
              ? <div className="flex flex-row">
                  <p className="text-lg">Don't have an account? </p>
                  <button onClick={()=>{setLogin(false); clearForm()}}>
                    <p className="text-lg text-red-500">Sign up</p>
                  </button>
                </div>
              : <div className="flex flex-row">
                  <p className="text-lg">Already have an account? </p>
                  <button onClick={()=>{setLogin(true); clearForm()}}>
                    <p className="text-lg text-red-500">Sign In</p>
                  </button>
                </div>
            }
            </div>
          </div>
      
    </div>
  )
}

export default Login