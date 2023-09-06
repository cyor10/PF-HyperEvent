'use client';
import React from 'react';
import { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { validateUser } from '@/validate/validate';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '@/redux/features/counter/counterSlice';
import Link from 'next/link';
import { IconEyes } from '@/utils/svg/svg';
import backgroundImage from "../../../public/backgroundSignUp.png"
import Image from 'next/image';
import { toast } from 'react-hot-toast'; 

export default function SignUp() {
  const dispatch = useDispatch();

  const router = useRouter();
  const [showPwd, setShowPwd]=useState(false)
  const [inputs, setInputs] = useState({
    email: '',
    name: '',
    last_name: '',
    password: '',
    file: null,
  });

  const [errors, setErrors] = useState({
    email: '',
    name: '',
    last_name: '',
    password: '',
    file: '',
  });
  console.log(errors);
  const [enableSubmit, setEnableSubmit] = useState(false);

  function handleInputs(event) {
    if (event.target.type === 'file') {
      setInputs({ ...inputs, file: event.target.files[0] });

      const checkingErrors = validateUser({
        ...inputs,
        [event.target.type]: event.target.files[0],
      });

      setErrors(checkingErrors);

      const hasErrors = Object.values(checkingErrors).some(
        (error) => error !== ''
      );
      setEnableSubmit(!hasErrors);
    } else {
      setInputs({
        ...inputs,
        [event.target.name]: event.target.value,
      });
    }
    const checkingErrors = validateUser({
      ...inputs,
      [event.target.name]: event.target.value,
    });

    setErrors(checkingErrors);

    const hasErrors = Object.values(checkingErrors).some(
      (error) => error !== ''
    );
    setEnableSubmit(!hasErrors);
  }

  /* function handleFileInput(event) {
    const selectedFile = event.target.files[0];
    setInputs({ ...inputs, file: selectedFile });
    setErrors({ ...errors, file: null }); // Clear the file error
  } */

  async function onSubmit(event) {
    event.preventDefault();
    try {
      let cloud = new FormData();
      cloud.set('email', inputs.email);
      cloud.set('name', inputs.name);
      cloud.set('last_name', inputs.last_name);
      cloud.set('password', inputs.password);
      cloud.set('file', inputs.file);
      const { data } = await axiosInstance.post('/signup', cloud, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (data.token) {
        localStorage.setItem('token', data.token);
        document.cookie = `tokens=${data.token}`;
        const response = await axiosInstance('/protected', {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        });
        dispatch(getUser(response.data.user));
        toast.success('User created successfully!', {
          style: {
            border: '3px solid #925FF0',
            padding: '16px',
            color: "#925FF0",
          },
          iconTheme: {
            primary: "#925FF0",
            secondary: '#FFFAEE',
          },
        });
        setTimeout(()=>router.push('/'),1500);;
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='mb-40 grid font-figtree md:grid-cols-2 max-h-[45rem]'>
    <div className="w-[65%] mx-auto flex flex-col align-start h-[100%] pb-5">
      <img
        className="w-40 mx-auto"
        src="https://res.cloudinary.com/hyperevents/image/upload/v1693102330/fc69a7cd877a754674613136a28b00ed_ghlch4.png"
      ></img>

      <div className="flex flex-row items-center justify-between ">
        <div className='flex flex-col'>
        <h2 className="text-4xl font-bold tracking-tight leading-9 text-black">Create an</h2>
        <h2 className="text-4xl font-bold tracking-tight leading-9 text-black">account</h2>
        </div>
        <h2 className="text-grey text-center flex flex-col">
          <Link className="text-purpleOscuro hover:underline" href="/login">
            Log in
          </Link>
        </h2>
      </div>

      <form
        onSubmit={onSubmit}
        className="w-[100%] font-normal mx-auto"
      >
        <div className="mt-6 ">
          <label className="block text-gray-700 font-semibold mb-1">
            Email
          </label>
          <input
            className="w-full px-3 text-[grey] border-[grey]  py-2 border-2 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            key="email"
            type="email"
            name="email"
            onChange={handleInputs}
            value={inputs.email}
            placeholder="example@gmail.com"
          />
        </div>
        {errors.email ? (
          <p className=" text-red-700 pt-1 ml-1">{errors.email}</p>
        ) : (
          <>
          </>
        )}

        <div className="grid  grid-cols-2 gap-4 mt-2">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Name
            </label>
            <input
              className="w-full px-3 py-2 text-[grey] border-[grey] border-2 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              key="name"
              type="name"
              name="name"
              onChange={handleInputs}
              value={inputs.name}
              placeholder="John"
            />
            {errors.name ? (
              <p className="text-red-700 pt-1">{errors.name}</p>
            ) : (
              <>
              </>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Last Name
            </label>
            <input
              className="w-full px-3 py-2 text-[grey] border-[grey] border-2 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              key="last_name"
              type="last_name"
              name="last_name"
              onChange={handleInputs}
              value={inputs.last_name}
              placeholder="Doe"
            />
            {errors.last_name ? (
              <p className="text-red-700 pt-1">{errors.last_name}</p>
            ) : (
              <>
              </>
            )}
          </div>
        </div>

        <div>
          <label className="block text-grey font-normal	mt-3 mb-1 ml-1">
            Password
          </label>
          <input
            className="w-full px-3 py-2 rounded-md text-[grey] border-[grey] border-2 focus:outline-none focus:ring focus:border-blue-500 font-normal"
            key="password"
            type={showPwd ? "text" : "password"}
            name="password"
            onChange={handleInputs}
            value={inputs.password}
            placeholder="Password"
             />
          <button type="button" className="relative top-[-2rem] left-[17rem]" onClick={()=> setShowPwd(!showPwd)}>
          
            <IconEyes />
          </button>
        </div>
        {errors.password ? (
          <p className="text-red-700 mt-[-1rem] ml-1 font-light text-md">{errors.password}</p>
        ) : (
          <>
          </>
        )}
        <div className="mt-2 mb-4">
          <label className="block text-gray-700 font-semibold mb-1">
            Profile picture
          </label>
          <input
            className="w-full px-3 py-2 text-[grey] border-[grey] border-2 rounded-md focus:outline-none focus:ring focus:border-blue-500 "
            type="file"
            name="file"
            onChange={handleInputs}
          />
          {errors.file ? (
            <p className="text-red-700 pt-1">{errors.file}</p>
          ) : (
            <>
            </>
          )}
        </div>
        <button
          className={`w-full py-3 px-4 rounded-md font-medium	 ${
            enableSubmit
              ? 'bg-purpleOscuro hover:bg-purpleNav text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          type="submit"
          disabled={!enableSubmit}
        >
          CREATE ACOUNT
        </button>
      </form>
    </div>

    <div className='hidden md:inline'>
          <Image
          className='w-full h-[min(60rem,120%)] object-cover'
          src={backgroundImage}
          />
    </div>
    </div>
  );
}
