'use client';
import React from "react";
import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { validateUser } from "@/validate/validate";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "@/redux/features/counter/counterSlice";
import Link from "next/link";
import { IconEyes } from "@/utils/svg/svg";

export default function SignUp() {
  const dispatch = useDispatch();

  const router = useRouter();

  const [inputs, setInputs] = useState({
    email: "",
    name: "",
    last_name: "",
    password: "",
    file: null,
  });

  const [errors, setErrors] = useState({
    email: "",
    name: "",
    last_name: "",
    password: "",
    file: "",
  });
  console.log(errors)
  const [enableSubmit, setEnableSubmit] = useState(false);

  function handleInputs(event) {
    if (event.target.type === "file") {
      setInputs({ ...inputs, file: event.target.files[0] });
      
      const checkingErrors = validateUser({
        ...inputs,
        [event.target.type]: event.target.files[0],
      });
  
      setErrors(checkingErrors);
  
      const hasErrors = Object.values(checkingErrors).some(
        (error) => error !== ""
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
      (error) => error !== ""
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
      cloud.set("email", inputs.email);
      cloud.set("name", inputs.name);
      cloud.set("last_name", inputs.last_name);
      cloud.set("password", inputs.password);
      cloud.set("file", inputs.file);
      const { data } = await axiosInstance.post("/signup", cloud, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (data.token) {
        localStorage.setItem("token", data.token);
        const response = await axiosInstance("/protected", {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        });
        dispatch(getUser(response.data.user));
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (

    <div className="flex flex-col items-start">

    <img className="w-40 mx-auto" src="https://res.cloudinary.com/hyperevents/image/upload/v1693102330/fc69a7cd877a754674613136a28b00ed_ghlch4.png"></img>

      <div className="w-full flex flex-row items-center justify-between">
        <h2 className="text-3xl pl-10 w-[60%] font-black text-black">
          CREATE AN ACCOUNT 
        </h2>

          <Link href="/login" className="pr-10 text-purpleOscuro">
        Log in
        </Link>

      </div>



      <form
        onSubmit={onSubmit}
        className="max-w-[90%] mx-auto p-6 mb-10 font-[figtree] font-normal"
      >

        <div className="mt-6">
          <label className="block text-gray-700 font-semibold mb-2">
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
          <p className=" text-red-700 pt-2 pb-5 ml-1">{errors.email}</p>
        ) : (
          <>
            <div className="text-transparent pt-2 pb-5 ml-1">`&ldquo;`</div>
          </>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="mb-2">
            <label className="block text-gray-700 font-semibold mb-2">
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
              <p className="text-red-700 pt-2">{errors.name}</p>
            ) : (
              <>
                <div className="text-transparent pt-2">`&ldquo;`</div>
              </>
            )}
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 font-semibold mb-2">
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
              <p className="text-red-700 pt-2">{errors.last_name}</p>
            ) : (
              <>
                <div className="text-transparent pt-2">`&ldquo;`</div>
              </>
            )}
          </div>
        </div>

        <div className="mb-2">
          <label className="block text-gray-700 font-semibold ">
            Password
          </label>
          <input
            className="w-full px-3 py-2 text-[grey] border-[grey] rounded border-2 focus:outline-none focus:ring focus:border-blue-500"
            key="password"
            type="password"
            name="password"
            onChange={handleInputs}
            value={inputs.password}
            placeholder="Password"
          />
          <button type='button' className="relative top-[-1.9rem] left-[16.5rem]">
          <IconEyes/>
          </button>
        {errors.password ? (
          <p className=" text-red-700 relative bottom-4">{errors.password}</p>
        ) : (
          <>
            <div className="text-transparent relative bottom-4">`&ldquo;`</div>
          </>
        )}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            User Image
          </label>
          <input
            className="w-full px-3 py-2 text-[grey] border-[grey] border-2 rounded-md focus:outline-none focus:ring focus:border-blue-500 "
            type="file"
            name="file"
            onChange={handleInputs}
          />
          {errors.file ? (
            <p className="text-red-700 pt-2">{errors.file}</p>
          ) : (
            <>
              <div className="text-transparent pt-2">`&ldquo;`</div>
            </>
          )}
        </div>
        <button
          className={`w-full py-3 px-4 rounded-md font-medium	 ${
            enableSubmit
              ? "bg-purpleOscuro hover:bg-purpleNav text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          type="submit"
          disabled={!enableSubmit}
        >
          CREATE ACOUNT
        </button>
      </form>
    </div>
  );
}