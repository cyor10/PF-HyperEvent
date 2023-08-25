import Image from "next/image";
import Carousel from "./components/Carousel/Carousel";
import Categories from "./components/Categories/Categories";
import axiosInstance from "../utils/axiosInstance";
import Link from "next/link";

export default async function LandingPage() {
  let { data } = await axiosInstance("/events");
  {
    data.events = data.events.slice(0, 100);
  }

  let dataCarousel = data.events.slice(0, 5);
  let categories = await axiosInstance("/categories");
  categories.data = categories.data.slice(8, 15);
  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-white">
      <div className="pb-10 bg-white w-full flex justify-center min-h-ful">
        <h1 className="text-6xl pt-7 text-black">Hyper Events</h1>
      </div>

      <Carousel>
        {dataCarousel &&
          dataCarousel.map((ev, index) => {
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
        <h2 className="text-2xl pl-3 pb-4 pt-8">Categories</h2>
        <Categories>
          {categories.data &&
            categories.data.map((sl, index) => {
              return (
                <Link
                  className="w-[5.5rem] h-[6rem] mx-2 ml-6"
                  key={index}
                  href={{
                    pathname: "/events",
                    query: { name: `${sl.name}` },
                  }}
                >
                  <div className="rounded flex flex-col text-center items-center justify-center w-[6rem] h-[8rem] relative">
                    <p className="pb-2 text-white absolute z-2">{sl.name}</p>
                    <img
                      loading="lazy"
                      className="w-[10rem] h-[6rem] rounded-md text-xs"
                      src={sl.image}
                      key={index}
                    />
                  </div>
                </Link>
              );
            })}
        </Categories>
      </div>

      <div className="flex flex-col gap-5 w-[22rem] justify-center pb-5 pt-10">
        <h2 className="text-2xl pl-3 pb-2">Events</h2>
        {data.events &&
          data.events.map((ev, index) => (
            <Link
              className="z-100"
              href="/detail/[name]"
              as={`/detail/${ev.event_name}`}
              key={index}
            >
              <div className="bg-white border-2 border-neutral-950 w-[22rem] h-[23rem] rounded flex flex-col justify-center items-center">
                <h2 className="text-black text-[1.2rem] p-2">{ev.event_name}</h2>
                <img
                  className="w-[21rem] h-80 object-cover rounded z-100"
                  src={ev.event_image}
                  alt="Descripción de la imagen"
                  width={1200}
                  height={300}
                  key={index}
                />
                <p className="text-black text-xl mt-2 pb-2.5">{ev.city}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
