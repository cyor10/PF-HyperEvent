"use client";
import axiosInstance from "../../utils/axiosInstance";
import Link from "next/link";
import { useState, useEffect } from "react";
import { validateLogin } from "../../validate/validate";
import { redirect, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { getUser } from "@/redux/features/counter/counterSlice";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
export default function Login() {
  const { data: session } = useSession({
    required: false
  })
  if(session){redirect("/")}
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
    })()
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
    <div className="flex flex-col align-start h-[91.6vh]">
      <div className="text-center text-3xl font-semibold my-10 pt-14">
        Login
      </div>
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
        {errors && <p className=" text-red-700">{errors.email}</p>}

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
          className={`w-full py-2 px-4 rounded-md font-semibold ${
            enableSubmit
              ? "bg-blue-500 hover:bg-blue-600 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          type="submit"
          disabled={!enableSubmit}
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
        <h2 className="text-gray-600 text-center mt-4">Or</h2>
        <button
          onClick={()=>signIn("google")}
          className="px-7 py-2 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
          style={{ backgroundColor: "#3b5998" }}
        >
          <img
            className="pr-2"
            src="https://cdn-icons-png.flaticon.com/512/2702/2702602.png"
            alt=""
            style={{ height: "2rem" }}
          />
          Continue with Google
        </button>
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
