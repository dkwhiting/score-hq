import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLoginMutation, useRegisterMutation } from '../app/shopAPI'
import {setUser} from '../app/userSlice'
import { removeData, retrieveData, setData } from '../utils'
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
    <div className="bg-white h-full px-6 justify-center">
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
        ? <p>Loading...</p>
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
                ?<input className="w-full border-solid border-slate-400 border rounded-2xl px-3 py-2" value={name} type='text' placeholder='Name' onChange={setName} /> 
                : null
              }

              <input className="w-full border-solid border-slate-400 border rounded-2xl px-3 py-2" value={email} type='text' placeholder='Email' onChange={setEmail} />
              <input className="w-full border-solid border-slate-400 border rounded-2xl px-3 py-2" value={password} type='password' placeholder='Password' onChange={setPassword}/>
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