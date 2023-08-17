'use client'
import React from 'react'
import { useState } from 'react'
import axios from 'axios'
//import cloudinary from '../components/cloudinaryConfig'

export default function SignUp() { // comentados Todos cloudinary 
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        /* file: "" */
      })

      function handleInputs(event) { 
          setInputs({
            ...inputs,
            [event.target.name]: event.target.value
          });
      }
      
      function onSubmit(event) {
        event.preventDefault()
        async function submit() {
          try {
            const {data} = await axios.post('http://localhost:3001/signup', inputs)
            if (data.token) {
              localStorage.setItem('token', data.token);
              console.log('Token guardado en el LocalStorage');
            }
          } catch (error) {
            console.log(error)
          }
        }
        submit()
      }

      /* async function onSubmit(event) { 
        event.preventDefault();
        try {
          let imageUrl = ""
          await cloudinary.v2.uploader.upload(
            inputs.file,
            { public_id: "olympic_flag" },
            function (error, result) {
              imageUrl = result
            }
          );
          console.log(imageUrl)
          const { data } = await axios.post('http://localhost:3001/signup', {...inputs, [inputs.file]: imageUrl}, {
            
          });
    
          if (data.token) {
            localStorage.setItem('token', data.token);
            console.log('Token guardado en el LocalStorage');
          }
        } catch (error) {
          console.log(error);
        }
      } */
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
      
      {/* <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">Image</label>
        <input
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          type="file"
          name="file"
          onChange={handleInputs}
        />
      </div> */}


      <button
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
        type="submit"
      >
        Submit
      </button>
    </form>
  )
}
