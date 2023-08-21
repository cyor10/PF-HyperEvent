'use client'
import React from 'react'
import { useState } from 'react'
import axiosInstance from '../../utils/axiosInstance';
import { validateUser } from '@/validate/validate'
import {useRouter} from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import { getUser } from '@/redux/features/counter/counterSlice'

export default function SignUp() {

    const dispatch = useDispatch()

    const router = useRouter()

    const [inputs, setInputs] = useState({
      username: "",
      email: "",
      name: "",
      last_name:"",
      password: "",
      file: null
    })

    const [errors, setErros] = useState({
      username: "",
      email: "",
      name: "",
      last_name:"",
      password: "",
      file: null
    })

    function handleInputs(event) { 
      if(event.target.type === "file") {
        setInputs({...inputs,
          file: event.target.files[0]
        });
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
        cloud.set("username", inputs.username)
        cloud.set("email", inputs.email)
        cloud.set("name", inputs.name)
        cloud.set("last name", inputs.last_name)
        cloud.set("password", inputs.password)
        cloud.set("file", inputs.file)
        const { data } = await axiosInstance.post('/signup', cloud, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        if (data.token) {
          localStorage.setItem('token', data.token);
          const response = await axiosInstance('/protected', {
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
    <div className="flex flex-col items-start mt-4">
    <form onSubmit={onSubmit} className="max-w-sm mx-auto p-6 bg-black shadow-md rounded-md">
      <h1 className="text-2xl font-semibold mb-4 text-center">Create Account</h1>
     
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Nickname</label>
        <input
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500 text-gray-700"
          key="username"
          type="username"
          name="username"
          onChange={handleInputs}
          value={inputs.username}
        />
      </div>
      {errors.username && <p className=' text-red-700'>{errors.username}</p>}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Email</label>
        <input
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500 text-gray-700"
          key="email"
          type="email"
          name="email"
          onChange={handleInputs}
          value={inputs.email}
        />
      </div>
      {errors.email && <p className=' text-red-700'>{errors.email}</p>}

      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">Name</label>
        <input
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500 text-gray-700"
          key="name"
          type="name"
          name="name"
          onChange={handleInputs}
          value={inputs.name}
        />
      </div>   
      {errors.name && <p className=' text-red-700'>{errors.name}</p>}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">Last Name</label>
        <input
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500 text-gray-700"
          key="last_name"
          type="last_name"
          name="last_name"
          onChange={handleInputs}
          value={inputs.last_name}
        />
      </div>   
      {errors.last_name && <p className=' text-red-700'>{errors.last_name}</p>}


      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">Password</label>
        <input
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500 text-gray-700"
          key="password"
          type="password"
          name="password"
          onChange={handleInputs}
          value={inputs.password}
        />
      </div>   
      {errors.password && <p className=' text-red-700'>{errors.password}</p>}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">User Image</label>
        <input
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500 "
          type="file"
          name="file"
          onChange={handleInputs}
        />
      </div>

     

      <button
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md "
        type="submit"
      >
        REGISTER
      </button>
    </form>
    </div>
  )
}
/* name: "",
      last_name: "",
      email: "",
      username: "", */