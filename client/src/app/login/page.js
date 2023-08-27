"use client";
import axiosInstance from "../../utils/axiosInstance";
import Link from "next/link";
import { useState, useEffect } from "react";
import { validateLogin } from "../../validate/validate";
import { redirect, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { getUser } from "@/redux/features/counter/counterSlice";

import { GoogleSignInButton } from "../components/auth-buttons";

import { useSession } from "next-auth/react";
import { IconEyes } from "@/utils/svg/svg";

export default function Login() {
  const { data: session } = useSession({
    required: false,
  });
  if (session) {
    redirect("/");
  }
  const dispatch = useDispatch();
  const router = useRouter();

  const [enableSubmit, setEnableSubmit] = useState(false);

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  function handleInputs(event) {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
    const checkingErrors = validateLogin({
      ...inputs,
      [event.target.name]: event.target.value,
    });

    setErrors(checkingErrors);

    const hasErrors = Object.values(checkingErrors).some(
      (error) => error !== ""
    );
    setEnableSubmit(!hasErrors);
  }

  function onSubmit(event) {
    event.preventDefault();
    (async () => {
      try {
        const { data } = await axiosInstance.post("/login", inputs);
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
    })();
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
    <div className="flex flex-col align-start h-[100%] pb-5">
      <img
        className="w-40 mx-auto"
        src="https://res.cloudinary.com/hyperevents/image/upload/v1693102330/fc69a7cd877a754674613136a28b00ed_ghlch4.png"
      ></img>

      <div className="flex flex-row items-center justify-between px-8 ">
        <h2 className="text-4xl font-black leading-9 text-black">LOG IN</h2>

        <h2 className="text-grey text-center flex flex-col">
          <Link className="text-purpleOscuro hover:underline" href="/signup">
            SignUp
          </Link>
        </h2>
      </div>
      <form className="max-w-sm mx-auto p-6 font-[figtree]" onSubmit={onSubmit}>
        <div className="mt-4">
          <label className="block text-grey font-normal	 mb-2 ml-1">Email</label>
          <input
            className="w-full px-3 py-2 rounded-md text-[grey] border-[grey] border-2 focus:outline-none focus:ring focus:border-blue-500  font-normal"
            key="email"
            type="email"
            name="email"
            onChange={handleInputs}
            value={inputs.email}
            placeholder="example@gmail.com"
          ></input>
        </div>
        {errors.email ? (
          <p className=" text-red-700 pt-2 pb-5 ml-1">{errors.email}</p>
        ) : (
          <>
            <div className="text-transparent pt-2 pb-5 ml-1">`&ldquo;`</div>
          </>
        )}

        <div>
          <label className="block text-grey font-normal	 mb-2 ml-1">
            Password
          </label>
          <input
            className="w-full px-3 py-2 rounded-md text-[grey] border-[grey] border-2 focus:outline-none focus:ring focus:border-blue-500 font-normal"
            key="password"
            type="password"
            name="password"
            onChange={handleInputs}
            value={inputs.password}
            placeholder="Password"
          ></input>
          <button type="button" className="relative top-[-2rem] left-[16.7rem]">
            <IconEyes />
          </button>
        </div>
        <h2 className="text-gray-600 flex flex-col">
          <Link
            className="text-[.8rem] text-start pl-1 relative bottom-5"
            href="/login/reset-password "
          >
            Forgot your password?{" "}
          </Link>
        </h2>
        {errors.password ? (
          <p className="text-red-700 pb-5 ml-1">{errors.password}</p>
        ) : (
          <>
            <div className="text-transparent pb-5 ml-1">`&ldquo;`</div>
          </>
        )}

        <button
          className={`w-full py-3 px-4 font-medium rounded-md ${
            enableSubmit
              ? "bg-purpleOscuro hover:bg-purpleNav text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          type="submit"
          disabled={!enableSubmit}
        >
          LOG-IN
        </button>
        <div className="w-[85%] h-2 bg-black mx-auto my-10 rounded-md"></div>
      </form>
      <GoogleSignInButton />
    </div>
  );
}
