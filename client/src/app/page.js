import Image from "next/image";
import { useDispatch, useSelector } from "react-redux/";
import Carousel from "./components/Carousel/Carousel";
import Categories from "./components/Categories/Categories";
import axiosInstance from "../utils/axiosInstance";
import axios from "axios";
import Link from "next/link";

export default async function LandingPage() {
  let { data } = await axiosInstance("/events");
  data.events = data.events.slice(0, 100)
  let categories = await axiosInstance("/categories");
  categories.data = categories.data.slice(0, 25);
  //console.log(categories.data)
  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-white">
      <div className="pb-10 bg-white w-full flex justify-center min-h-ful">
        <h1 className="text-6xl pt-7 text-black">Hyper Events</h1>
      </div>

      <Carousel>
        {data.events &&
          data.events.map((ev, index) => {
            return (
              <img
                className="w-96 h-96 object-cover"
                src={ev.event_image}
                alt="Descripción de la imagen"
                width={900}
                height={300}
                key={index}
              />
            );
          })}
      </Carousel>

      <div className="flex flex-col justify-start w-full pt-3">
        <h2 className="text-xl pl-3 pb-4 pt-8">Categories</h2>
        <Categories>
          {categories.data &&
            categories.data.map((sl, index) => {
              return (
                  <Link
                    href={{
                      pathname: "/events",
                      query: { name: `${sl.name}` },
                    }}
                  >
                    <img
                      loading="lazy"
                      className="w-50 h-[6rem] mx-5 rounded-md"
                      src={sl.image}
                      key={index}
                    />
                  </Link>
              );
            })}
        </Categories>
      </div>

      <div className="flex flex-col gap-5 w-[22rem] justify-center pb-5">
        {data.events &&
          data.events.map((ev, index) => (
            <Link href="/detail/[name]" as={`/detail/${ev.event_name}`}>
              <div className="bg-gray-700 w-[22rem] h-[23rem] rounded flex flex-col justify-center items-center">
                <h2 className="text-white p-2">{ev.event_name}</h2>
                <img
                  className="w-[21rem] h-80 object-cover rounded"
                  src={ev.event_image}
                  alt="Descripción de la imagen"
                  width={1200}
                  height={300}
                  key={index}
                />
                <p className="text-white mt-2 pb-2.5">{ev.city}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
