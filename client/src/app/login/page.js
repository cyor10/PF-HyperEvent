'use client';
import axiosInstance from '../../utils/axiosInstance';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { validateLogin } from '../../validate/validate';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { getUser } from '@/redux/features/counter/counterSlice';
import Image from 'next/image';
import { GoogleSignInButton } from '../components/auth-buttons';
import { toast } from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { IconEyes } from '@/utils/svg/svg';


export default function Login() {
  const [showPwd, setShowPwd] = useState(false)
  const [tokencito, setTokencito] = useState('');
  const [existAccount, setExistAccount] = useState(true);
  const session = useSession();
  const dispatch = useDispatch();
  const router = useRouter();
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const googleUser = async () => {
    try {
      if (session) {
        let cloud = new FormData();
        cloud.set('email', session.data?.user.email);
        cloud.set('name', session.data?.user.name);
        cloud.set('last_name', session.data?.user.last_name);
        cloud.set('password', session.data?.user.password);
        cloud.set('user_image', session.data?.user.user_image);
        const { data } = await axiosInstance.post('/signup', cloud, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (data.token) {
          localStorage.setItem('token', data.token);
          document.cookie = `tokens=${data.token};max-age=31536000;path=/`;
          await axiosInstance('/protected', {
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
          });
        }
      }
    } catch (error) {
      inputs.email = session.data?.user.email;
      const { data } = await axiosInstance.post('/loginGoogle', inputs);
      if (data.token) {
        localStorage.setItem('token', data.token);
        document.cookie = `tokens=${data.token};max-age=31536000;path=/`;
        await axiosInstance('/protected', {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        });
      }
      console.log(error);
    }
    router.push('/');
  };
  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/');
    }
  });
  useEffect(() => {
    if (session.data === undefined || session.data === null) {
    } else {
      toast.success('You logged in succesfully!', {
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
      googleUser()
    }
  }, [session]);
  useEffect(() => {
    console.log(tokencito); // This will log the correct value of tokencito 
    if (!localStorage.getItem("token")) { localStorage.setItem('token', tokencito); }
  }, [tokencito]);

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
      (error) => error !== ''
    );
    setEnableSubmit(!hasErrors);
  }

  function onSubmit(event) {
    event.preventDefault();
    (async () => {
      try {
        const { data } = await axiosInstance.post('/login', inputs);
        if (data.token) {
          document.cookie = `tokens=${data.token};max-age=31536000;path=/`
          localStorage.setItem('token', data.token);
          const response = await axiosInstance('/protected', {
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
          });
          dispatch(getUser(response.data.user));
          toast.success('You logged in succesfully!', {
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
          setTimeout(() => router.push('/'), 1500);
        }
      } catch (error) {
        console.log(error);
        setExistAccount(false);
      }
    })();
  }
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('Estoy logueado:', token);
    } else {
      console.log('Token no encontrado en el LocalStorage');
    }
  }, []);

  return (
    <div className='mb-10 grid font-figtree md:grid-cols-2 max-h-[45rem]'>
      <div className="mx-auto flex flex-col align-start h-[100%] max-h-[720px] pb-5">
        <Link href='/'>
          <img
            alt='HyperIcon'
            className="w-40 mx-auto"
            src="https://res.cloudinary.com/hyperevents/image/upload/v1693102330/fc69a7cd877a754674613136a28b00ed_ghlch4.png"
          ></img>
        </Link>

        <div className="flex flex-row items-center justify-between ">
          <h2 className="text-4xl font-bold tracking-tight leading-9 text-black">Log in</h2>

          <h2 className="text-grey text-center flex flex-col">
            <Link className="text-purpleOscuro hover:underline" href="/signup">
              Sign up
            </Link>
          </h2>
        </div>
        <form
          className="w-[100%] mx-auto font-normal"
          onSubmit={onSubmit}
        >
          <div className="mt-6">
            <label className="block text-grey font-normal	 mb-2 ml-1">Email</label>
            <input
              className="w-[100%] px-3 py-2 rounded-md text-[grey] border-[grey] border-2 focus:outline-none focus:ring focus:border-blue-500  font-normal"
              key="email"
              type="email"
              name="email"
              onChange={handleInputs}
              value={inputs.email}
              placeholder="example@gmail.com"
            ></input>
          </div>
          {errors.email ? (
            <p className=" text-red-700 pt-2 ml-1 ">{errors.email}</p>
          ) : (
            <>
            </>
          )}

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
            <button type="button" className="relative top-[-2rem] left-[17rem]" onClick={() => setShowPwd(!showPwd)}>

              <IconEyes />
            </button>
          </div>
          <p className="text-gray-600 flex flex-col">
            <Link
              className="text-[.8rem] text-start pl-1 relative bottom-5"
              href="/login/reset-password "
            >
              Forgot your password?{' '}
            </Link>
          </p>

          {errors.password ? (
            <p className="text-red-700 mt-[-1rem] ml-1 font-light text-md">{errors.password}</p>
          ) : (
            <>
            </>
          )}

          <button
            className={`mt-5 w-full py-3 px-3 font-medium rounded-md ${enableSubmit
              ? 'bg-purpleOscuro hover:bg-purpleNav text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            type="submit"
            disabled={!enableSubmit}
          >
            LOG-IN
          </button>
          {existAccount === false ? (
            <p className="text-red-700 pb-5 ml-14 pt-5">
              This account does not exist.
            </p>
          ) : (
            <p className="text-red-700 pb-5 ml-14 pt-5"></p>
          )}
          <div
            className={`w-[85%] h-2 bg-black mx-auto my-9 mt-0 rounded-md`}
          ></div>
        </form>
        <div className="w-[100%] mx-auto relative bottom-6 mb-5">
          <GoogleSignInButton />
        </div>
      </div>

      <div className='hidden md:inline'>
        <Image
          alt="LoginImage"
          className='w-full h-[105%]'
          src="https://res.cloudinary.com/hyperevents/image/upload/v1694018916/backgroundImageLogin_cn8mqy.png"
          width={721}
          height={720}
        />
      </div>
    </div>
  );
}
