'use client';
import axiosInstance from '../../utils/axiosInstance';
import Link from "next/link";
import { useState, useEffect } from "react";
import { validateUser } from "../../validate/validate";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { getUser } from "@/redux/features/counter/counterSlice";

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [errros, setErros] = useState({
    email: "",
    password: "",
  });

  function handleInputs(event) {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
    setErros(
      validateUser({
        ...inputs,
        [event.target.name]: event.target.value,
      })
    );
  }

  function onSubmit(event) {
    event.preventDefault();
    async function submit() {
      try {
        const { data } = await axiosInstance.post(
          "/login",
          inputs
        );
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
    submit();
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("Estoy logueado:", token);
    } else {
      console.log("Token no encontrado en el LocalStorage");
    }
  }, []);

  return (
    <div className="flex flex-col align-start h-[82.4vh]">
      <div className="text-center text-3xl font-semibold my-10">Login</div>
      <form
        className="max-w-sm mx-auto p-6 bg-white shadow-md rounded-md"
        onSubmit={onSubmit}
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Email
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500 text-gray-700"
            key="email"
            type="email"
            name="email"
            onChange={handleInputs}
            value={inputs.email}
          ></input>
        </div>
        {errros && <p className=' text-red-700'>{errros.email}</p>}

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Password
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500 text-gray-700"
            key="password"
            type="password"
            name="password"
            onChange={handleInputs}
            value={inputs.password}
          ></input>
        </div>

        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
          type="submit"
        >
          Submit
        </button>

        <h2 className="text-gray-600 text-center mt-4 flex flex-col">
          <Link
            className="text-blue-500 hover:underline"
            href="/login/reset-password "
          >
            Forgot your password?{" "}
          </Link>
        </h2>
      </form>

      <h2 className="text-gray-600 text-center mt-4 flex flex-col">
        Don&apos;t have an account?{" "}
        <Link className="text-blue-500 hover:underline" href="/signup">
          SignUp
        </Link>
      </h2>
    </div>
  );
}
