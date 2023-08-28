"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import Link from "next/link";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import Image from "next/image";

export default function Detail({ params }) {
  const { name } = params;
  const [event, setEvent] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosInstance(`/events?name=${name}`);
        setEvent(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const numericDate = new Date(event.start_at);
  const week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayName = week[numericDate.getDay() + 1];
  const dayNum = numericDate.getDate() + 1;
  const month = monthsOfYear[numericDate.getMonth()];

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

 
  function Map() {
    if (event.location) {
      return (
        <GoogleMap
          zoom={15}
          center={{ lat: event.location.lat, lng: event?.location.lon }}
          mapContainerClassName="w-full h-[230px]"
          options={{mapId: "5a77ea9001288394",disableDefaultUI: true,clickableIcons: false,}}
        >
          <Marker position={{ lat: event.location.lat, lng: event?.location.lon }} />
        </GoogleMap>
      );
    }
  }

  return (
    <div className="p-5 bg-white pt-24">
      <div className="bg-white border-2 border-neutral-950 text-black">
      {event?.event_image && (
        <Image
          src={event?.event_image}
          className="w-full h-30vh"
          height={200}
          width={200}
          alt="event-image"
          
        />
      )}
        <h2 className="text-3xl mt-2 text-center ">
          {event && event.event_name}
        </h2>
        <div className="flex mt-8 justify-between">
          <h3 className="ml-6">{`${dayName}, ${month} ${dayNum}nd`}</h3>
          <div className="flex mr-11">
            <svg
              className="mr-2 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.57351 12.5508C5.43058 15.4456 9.16699 19.0205 11.0003 19.2497C12.8337 19.0205 16.5702 15.4456 18.4272 12.5508C20.1236 9.90607 20.2156 6.76957 18.2216 4.69698C16.327 2.72766 13.3133 2.75069 11.3071 4.53584C11.202 4.62945 11.0995 4.72791 11.0002 4.83117C10.9008 4.7279 10.7984 4.62943 10.6932 4.53581C8.68705 2.75069 5.67367 2.72767 3.77905 4.69698C1.78507 6.76957 1.87693 9.90614 3.57351 12.5508Z"
                fill="black"
              />
            </svg>
            <svg
              className="cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.50063 0L15.0345 5.26642L13.5418 6.68705L10.5568 3.84633L10.5568 14.0487H8.44564L8.44564 3.84526L5.45952 6.68705L3.96673 5.26642L9.50063 0ZM2.11111 16.9909V14.9819H0V19H19V14.9819H16.8889V16.9909H2.11111Z"
                fill="black"
              />
            </svg>
          </div>
        </div>
        <h4 className="text-lg ml-6 mt-2">Stock: {event && event.stock}</h4>
        <h3 className="text-lg ml-6 mt-2">Review: {event && event.review}</h3>
        <div>
          <h2 className="text-2xl ml-6 mt-4">When and where</h2>

          <div className="flex ml-6 mt-4">
            <svg
              className="mt-4"
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.5625 1.3125C6.92494 1.3125 7.21875 1.60631 7.21875 1.96875V2.625H13.7812V1.96875C13.7812 1.60631 14.0751 1.3125 14.4375 1.3125C14.7999 1.3125 15.0938 1.60631 15.0938 1.96875V2.625H17.0625C17.7874 2.625 18.375 3.21263 18.375 3.9375V17.0625C18.375 17.7874 17.7874 18.375 17.0625 18.375H3.9375C3.21263 18.375 2.625 17.7874 2.625 17.0625V3.9375C2.625 3.21263 3.21263 2.625 3.9375 2.625H5.90625V1.96875C5.90625 1.60631 6.20006 1.3125 6.5625 1.3125ZM5.90625 3.9375H3.9375V6.5625H17.0625V3.9375H15.0938V4.59375C15.0938 4.95619 14.7999 5.25 14.4375 5.25C14.0751 5.25 13.7812 4.95619 13.7812 4.59375V3.9375H7.21875V4.59375C7.21875 4.95619 6.92494 5.25 6.5625 5.25C6.20006 5.25 5.90625 4.95619 5.90625 4.59375V3.9375ZM17.0625 7.875H3.9375V17.0625H17.0625V7.875Z"
                fill="#000022"
              />
            </svg>
            <div>
              <h3 className="text-lg ml-4">Date and time</h3>
              <h3 className="ml-4">{event.start_at?.split("T")[0]}</h3>
            </div>
          </div>
          <div className="flex m-2 mt-4 ">
            <div className="w-full flex flex-col">
              <h3 className="text-lg ml-4">Location</h3>
              {!isLoaded ? <div>Loading...</div> : <Map />}
            </div>
          </div>
        </div>
        <h2 className="text-xl ml-6 mt-6">About this event</h2>
        <h3 className="text-lg ml-6 mt-2">{event && event.description}</h3>
        <h3 className="text-xl ml-6 mt-6">Follow this event</h3>
        <div className="flex mt-6 justify-center">
          <svg
            className="cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
          >
            <path
              d="M45.8337 25.1267C45.8337 13.5503 36.5073 4.16699 25.0003 4.16699C13.4934 4.16699 4.16699 13.5503 4.16699 25.1267C4.16699 35.5906 11.7837 44.2614 21.7448 45.8337V31.1864H16.4559V25.1253H21.7448V20.5087C21.7448 15.2559 24.8545 12.3531 29.6142 12.3531C31.892 12.3531 34.2781 12.7628 34.2781 12.7628V17.9212H31.6489C29.0614 17.9212 28.2559 19.5378 28.2559 21.1962V25.1267H34.0337L33.11 31.185H28.2559V45.8337C38.217 44.2614 45.8337 35.5906 45.8337 25.1267Z"
              fill="black"
            />
          </svg>

          <svg
            className="ml-10 mr-10 cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M25 6.25C19.9075 6.25 19.27 6.27125 17.27 6.3625C15.2738 6.45375 13.91 6.77125 12.7175 7.235C11.4675 7.705 10.3337 8.4425 9.39625 9.3975C8.44278 10.3339 7.70482 11.4669 7.23375 12.7175C6.7725 13.91 6.45375 15.275 6.3625 17.2713C6.2725 19.27 6.25 19.9062 6.25 25C6.25 30.0938 6.27125 30.73 6.3625 32.73C6.45375 34.7262 6.77125 36.09 7.235 37.2825C7.705 38.5325 8.4425 39.6662 9.3975 40.6037C10.3339 41.5572 11.4669 42.2951 12.7175 42.7663C13.91 43.2287 15.2738 43.5462 17.27 43.6375C19.27 43.7287 19.9075 43.75 25 43.75C30.0925 43.75 30.73 43.7287 32.73 43.6375C34.7262 43.5462 36.09 43.2287 37.2825 42.765C38.5325 42.295 39.6662 41.5575 40.6037 40.6025C41.5572 39.6661 42.2952 38.5331 42.7663 37.2825C43.2287 36.09 43.5462 34.7262 43.6375 32.73C43.7287 30.73 43.75 30.0925 43.75 25C43.75 19.9075 43.7287 19.27 43.6375 17.27C43.5462 15.2738 43.2287 13.91 42.765 12.7175C42.2943 11.4663 41.5563 10.3329 40.6025 9.39625C39.6661 8.44278 38.5331 7.70482 37.2825 7.23375C36.09 6.7725 34.725 6.45375 32.7288 6.3625C30.73 6.2725 30.0938 6.25 25 6.25ZM25 9.62875C30.0063 9.62875 30.6 9.6475 32.5775 9.7375C34.405 9.82125 35.3975 10.125 36.0588 10.3837C36.9338 10.7225 37.5588 11.13 38.215 11.785C38.8713 12.4412 39.2775 13.0662 39.6162 13.9412C39.8738 14.6025 40.1787 15.595 40.2625 17.4225C40.3525 19.4 40.3713 19.9937 40.3713 25C40.3713 30.0063 40.3525 30.6 40.2625 32.5775C40.1787 34.405 39.875 35.3975 39.6162 36.0588C39.3162 36.8732 38.8373 37.61 38.215 38.215C37.6101 38.8375 36.8733 39.3163 36.0588 39.6162C35.3975 39.8738 34.405 40.1787 32.5775 40.2625C30.6 40.3525 30.0075 40.3713 25 40.3713C19.9925 40.3713 19.4 40.3525 17.4225 40.2625C15.595 40.1787 14.6025 39.875 13.9412 39.6162C13.1268 39.3162 12.39 38.8373 11.785 38.215C11.1627 37.6099 10.6839 36.8731 10.3837 36.0588C10.1262 35.3975 9.82125 34.405 9.7375 32.5775C9.6475 30.6 9.62875 30.0063 9.62875 25C9.62875 19.9937 9.6475 19.4 9.7375 17.4225C9.82125 15.595 10.125 14.6025 10.3837 13.9412C10.7225 13.0662 11.13 12.4412 11.785 11.785C12.3899 11.1626 13.1268 10.6837 13.9412 10.3837C14.6025 10.1262 15.595 9.82125 17.4225 9.7375C19.4 9.6475 19.9937 9.62875 25 9.62875Z"
              fill="black"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M24.9998 31.2561C24.1782 31.2561 23.3647 31.0942 22.6056 30.7798C21.8466 30.4654 21.1569 30.0046 20.576 29.4236C19.995 28.8427 19.5342 28.153 19.2198 27.394C18.9054 26.6349 18.7436 25.8214 18.7436 24.9998C18.7436 24.1782 18.9054 23.3647 19.2198 22.6056C19.5342 21.8466 19.995 21.1569 20.576 20.576C21.1569 19.995 21.8466 19.5342 22.6056 19.2198C23.3647 18.9054 24.1782 18.7436 24.9998 18.7436C26.6591 18.7436 28.2504 19.4027 29.4236 20.576C30.5969 21.7492 31.2561 23.3405 31.2561 24.9998C31.2561 26.6591 30.5969 28.2504 29.4236 29.4236C28.2504 30.5969 26.6591 31.2561 24.9998 31.2561ZM24.9998 15.3623C22.4438 15.3623 19.9924 16.3777 18.1851 18.1851C16.3777 19.9924 15.3623 22.4438 15.3623 24.9998C15.3623 27.5558 16.3777 30.0072 18.1851 31.8145C19.9924 33.6219 22.4438 34.6373 24.9998 34.6373C27.5558 34.6373 30.0072 33.6219 31.8145 31.8145C33.6219 30.0072 34.6373 27.5558 34.6373 24.9998C34.6373 22.4438 33.6219 19.9924 31.8145 18.1851C30.0072 16.3777 27.5558 15.3623 24.9998 15.3623ZM37.441 15.1873C37.441 15.7915 37.201 16.371 36.7738 16.7982C36.3466 17.2254 35.7671 17.4654 35.1629 17.4654C34.5587 17.4654 33.9793 17.2254 33.552 16.7982C33.1248 16.371 32.8848 15.7915 32.8848 15.1873C32.8848 14.5831 33.1248 14.0037 33.552 13.5764C33.9793 13.1492 34.5587 12.9092 35.1629 12.9092C35.7671 12.9092 36.3466 13.1492 36.7738 13.5764C37.201 14.0037 37.441 14.5831 37.441 15.1873Z"
              fill="black"
            />
          </svg>

          <svg
            className="cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
          >
            <path
              d="M41.568 16.4999C41.5934 16.8672 41.5934 17.2345 41.5934 17.6052C41.5934 28.9008 32.9943 41.9281 17.2705 41.9281V41.9213C12.6256 41.9281 8.07721 40.5976 4.16699 38.089C4.84239 38.1702 5.52118 38.2109 6.20166 38.2126C10.0509 38.2159 13.7902 36.9244 16.8185 34.5461C13.1605 34.4767 9.95276 32.0916 8.83217 28.6097C10.1136 28.8568 11.4339 28.806 12.6916 28.4624C8.70352 27.6567 5.83434 24.1527 5.83434 20.0834C5.83434 20.0461 5.83434 20.0106 5.83434 19.975C7.02264 20.6369 8.35313 21.0042 9.71408 21.0449C5.95791 18.5345 4.80007 13.5376 7.06834 9.63074C11.4085 14.9713 17.8121 18.218 24.6863 18.5616C23.9974 15.5926 24.9385 12.4813 27.1594 10.3942C30.6024 7.15766 36.0175 7.32354 39.254 10.7649C41.1685 10.3874 43.0034 9.68491 44.6826 8.68958C44.0444 10.6684 42.7089 12.3493 40.9247 13.4174C42.6192 13.2176 44.2746 12.764 45.8337 12.0717C44.686 13.7915 43.2404 15.2896 41.568 16.4999Z"
              fill="black"
            />
          </svg>
        </div>
        <div className="flex flex-col justify-center mt-8 h-40 items-center bg-white bg-opacity-20">
          <h3 className="text-lg">Starts in: $1111</h3>
          <div className="flex justify-center w-10/12 bg-black mt-10 h-14 items-center rounded-md relative cursor-pointer">
            <Link className="text-white" href="/payment">
              Buy Tickets
            </Link>
            <svg
              className="absolute right-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 12.5C3 12.0858 3.33579 11.75 3.75 11.75H20.25C20.6642 11.75 21 12.0858 21 12.5C21 12.9142 20.6642 13.25 20.25 13.25H3.75C3.33579 13.25 3 12.9142 3 12.5Z"
                fill="#FDFDFD"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.9697 5.21967C13.2626 4.92678 13.7374 4.92678 14.0303 5.21967L20.7803 11.9697C21.0732 12.2626 21.0732 12.7374 20.7803 13.0303L14.0303 19.7803C13.7374 20.0732 13.2626 20.0732 12.9697 19.7803C12.6768 19.4874 12.6768 19.0126 12.9697 18.7197L19.1893 12.5L12.9697 6.28033C12.6768 5.98744 12.6768 5.51256 12.9697 5.21967Z"
                fill="#FDFDFD"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
