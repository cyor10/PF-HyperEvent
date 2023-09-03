"use client";

import React from "react";
import Link from "next/link";
import SearchBar from "../SearchBar/SearchBar";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { getUser } from "@/redux/features/counter/counterSlice";
import { setSearchBar } from "@/redux/features/events/counterSlice";
import { useSelector, useDispatch } from "react-redux";
import { IconHambuger, IconSearch, IconX } from "@/utils/svg/svg";
import { useParams } from "next/navigation";


export default function NavBar() {

  const { price } = useParams()

  const { data: session } = useSession({
    required: false
  })
  const dispatch = useDispatch();
  const pathname = usePathname()
  const reduxUser = useSelector((state) => state.counter);
  const events = useSelector((state) => state.events);
  const [navbar, setNavbar] = useState(false);
  useEffect(() => {
    let token = localStorage?.getItem("token");
    if (token) {
      (async () => {
        try {
          const { data } = await axiosInstance("/protected", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          dispatch(getUser(data.user));
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [dispatch]);

  const handleSearch = ()=>{
      if (navbar === true) {
        setNavbar(false);

        dispatch(setSearchBar(!events.searchBar));
      } else {
        dispatch(setSearchBar(!events.searchBar));
      }
    }
    
  return (price?.length > 0 ||pathname === '/signup' || pathname === '/login' || pathname === '/payment' || pathname === '/payment/success' || pathname === '/payment/error') ? null : (
    <div>
      <nav className="w-full bg-purpleNav top-0 left-0 right-0 z-10 fixed h-18">
  <div className="justify-between lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              <Link href="/">
                <img
                  src="https://res.cloudinary.com/hyperevents/image/upload/v1693104043/2f79163d9c2b01b94bee3fbfe55cf941_ifonjr.png"
                  className="text-2xl ml-2 text-black font-bold w-12 h-10"
                  onClick={() => window.location.href = '/'}
                  alt="cloudinary-image"
                >
                  
                </img>
              </Link>

              {(reduxUser.name && !session) && (
                <label htmlFor="user" className="text-white mr-2">
                  {reduxUser.name}
                </label>
              )}
              {session?.user.name && (
                <label htmlFor="user" className="text-white mr-2">
                  {session.user.name}
                </label>
              )}
              {session?.user.user_image && (
                <Image 
                  name="user" 
                  className="w-10 h-10 rounded-full" 
                  src={session.user.user_image} 
                  height={100} 
                  width={100}
                  alt="user-session"
                />
              )}

              {(reduxUser.user_image && !session) && (
                <Image
                  name="user"
                  className="w-10 h-10 rounded-full"
                  src={reduxUser.user_image}
                  height={100}
                  width={100}
                  alt="user-image"
                />
              )}

            <div className="w-10  h-10 bg-[#F4EFFD] flex justify-center items-center rounded-full" onClick={handleSearch}>
            <IconSearch className="cursor-pointer z-10"
              ></IconSearch>
            </div>

              <div className="md:hidden">
                <button
                  className="p-2 text-white rounded-md outline-none focus:border-gray-400 focus:border mr-4"
                  onClick={() => {
                    if (events.searchBar === true) {
                      dispatch(setSearchBar(false));
                      setNavbar(!navbar);
                    } else {
                      setNavbar(!navbar);
                    }
                  }}
                >
                  {navbar ? (
                    <IconX className="min-h-5 max-h-6"/>
                  ) : (
                    <IconHambuger
                      className="min-h-5 mr-2 max-h-6"
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? "p-12 md:p-0 block" : "hidden"
              }`}
            >
              <ul className="h-screen overflow-hidden md:h-auto items-center justify-center md:flex">
                <li className="pb-4 pt-4 text-xl text-white py-2 md:px-6 text-center border-b-2 md:border-b-0  hover:bg-purple-900  border-white  md:hover:text-purple-600 md:hover:bg-transparent">
                  <Link href="/" onClick={() => setNavbar(!navbar)}>
                    Home
                  </Link>
                </li>
                {(!reduxUser.name && !session) && (
                  <li className="pb-4 pt-6 text-xl text-white py-2 px-6 text-center  border-b-2 md:border-b-0  hover:bg-purple-600  border-white  md:hover:text-purple-600 md:hover:bg-transparent">
                    <Link href="/login" onClick={() => setNavbar(!navbar)}>
                      Login
                    </Link>
                  </li>
                )}
                <li className="pb-4 pt-6 text-xl text-white py-2 px-6 text-center  border-b-2 md:border-b-0  hover:bg-purple-600  border-white  md:hover:text-purple-600 md:hover:bg-transparent">
                  <Link href="/create_event" onClick={() => setNavbar(!navbar)}>
                    Create Events
                  </Link>
                </li>
                {session && (                
                <li className="pb-4 pt-6 text-xl text-white py-2 px-6 text-center  border-b-2 md:border-b-0  hover:bg-purple-600  border-white  md:hover:text-purple-600 md:hover:bg-transparent">
                  <Link href="/" onClick={() => {setNavbar(!navbar);signOut();localStorage.removeItem('token')}}>
                    Logout
                  </Link>
                </li>)}
                {(reduxUser.name && !session) &&                 
                <li className="pb-4 pt-6 text-xl text-white py-2 px-6 text-center  border-b-2 md:border-b-0  hover:bg-purple-600  border-white  md:hover:text-purple-600 md:hover:bg-transparent">
                  <button onClick={() => {setNavbar(!navbar); localStorage.removeItem('token'); dispatch(getUser({username: "", password: ""}))}}>
                    Logout
                  </button>
                </li>}
              </ul>
            </div>
          </div>
          <div
            className={`h-screen w-screen flex-1 bg-slate-50 justify-self-center pb-3 md:block md:pb-0 md:mt-0 ${
              events.searchBar ? "pt-6 md:p-0 block" : "hidden"
            }`}
          >
            <SearchBar />
          </div>
        </div>
      </nav>
    </div>
  );
}