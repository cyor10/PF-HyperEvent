'use client'
import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { validateUser } from '@/validate/validate'
import {useRouter} from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import { getUser } from '@/redux/features/counter/counterSlice'

export default function SignUp() {

    const dispatch = useDispatch()

    const router = useRouter()

    const [inputs, setInputs] = useState({
      email: "",
      password: "",
      file: null
    })

    const [errors, setErros] = useState({
      email: "",
      password: "",
      file: null,
    })

    function handleInputs(event) { 
      if(event.target.type === "file") {
        setInputs({...inputs,
          file: event.target.files[0]
        });
      // } else if(event.target.type === "email"){
      //   // if it is an email, we lower case all the letters
      //   setInputs({
      //     ...inputs,
      //     email:event.target.value.toLowerCase()
      //   })
        }else{
        setInputs({
          ...inputs,
          [event.target.name]: event.target.value
        })
        setErros(validateUser({
          ...inputs,
          [event.target.name]: event.target.value
        }))
      }
    }
  
    
    async function onSubmit(event) { 
      event.preventDefault();
      try {
        let cloud = new FormData();
        cloud.set("email", inputs.email)
        cloud.set("password", inputs.password)
        cloud.set("file", inputs.file)
        const { data } = await axios.post('http://localhost:3001/signup', cloud, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        if (data.token) {
          localStorage.setItem('token', data.token);
          const response = await axios('http://localhost:3001/protected', {
            headers:{
              Authorization: `Bearer ${data.token}`
            }
          })
            dispatch(getUser(response.data.user))
          router.push('/')
        }
      } catch (error) {
        console.log(error);
      }
    }
  return (
    <form onSubmit={onSubmit} className="max-w-sm mx-auto p-6 bg-black shadow-md rounded-md">
      <h1 className="text-2xl font-semibold mb-4">SignUp</h1>
      
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Email</label>
        <input
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          key="email"
          type="email"
          name="email"
          onChange={handleInputs}
          value={inputs.email}
        />
      </div>
      {errors.email && <p className='bg-red'>{errors.email}</p>}
      
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">Password</label>
        <input
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          key="password"
          type="password"
          name="password"
          onChange={handleInputs}
          value={inputs.password}
        />
      </div>   
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">Image</label>
        <input
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          type="file"
          name="file"
          onChange={handleInputs}
        />
      </div>
      <button
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
        type="submit"
      >
        Submit
      </button>
    </form>
  )
}
