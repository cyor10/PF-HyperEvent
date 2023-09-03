import React from 'react';
import Link from 'next/link';
import { IconArrowLeft } from '@/utils/svg/svg';

export default function Parte3() {
  return (
    <div className="pt-24 ml-4 pb-10 px-[.5rem]">
      <Link href={'/create_event/form_step_1'}>
        <IconArrowLeft />
      </Link>

      <div className="flex flex-row items-center justify-center mr-4">
        <p className="text-[.8rem]">Step 3 of 4 </p>
        <div className="w-20 h-1 bg-purpleOscuro ml-2 rounded-md"></div>
        <div className="w-8 h-1 bg-[#F4EFFD] rounded-r-md"></div>
      </div>

      <h3 className="pt-5 text-[2rem] font-bold mr-3 text-textForm ">
        More info on the event
      </h3>

      <form>
        <div className="flex flex-col justify-center">
          <h4 className="pt-5 text-[1.6rem] font-bold  text-textForm">
            Summary
          </h4>

          <p className="text-[1.1rem] font-ligth mr-4 pt-1">
            Grab people&apos;s attention with a short description about your
            event. Attendees will see this at the top of your event page. (140
            characters max)
          </p>

          <textarea className="shadow-lg mr-5 p-2 w-[95%] h-[10rem] mt-4 border-2 border-purpleNav rounded mx-auto"></textarea>
        </div>

        <div>
          <h4 className="pt-5 text-[1.6rem] font-bold  text-textForm">
            Description
          </h4>

          <p className="text-[1.1rem] font-ligth mr-4 pt-1">
            Add more details to your event like your schedule, sponsors, or
            featured guests.
          </p>

          <textarea className="shadow-lg mr-5 p-2 w-[95%] h-[10rem] mt-4 border-2 border-purpleNav rounded mx-auto"></textarea>
        </div>

        <div>
          <h4 className="pt-5 text-[1.6rem] font-bold  text-textForm">
            Social media
          </h4>

          <p className="text-[1.1rem] font-ligth mr-4 mb-5 pt-1">
            Share your social media information to have all your attendees
            updated an grow your online presence
          </p>

          <label className="text-[1rem] pt-5 ml-1">Twitter</label>
          <input
            className="w-[95%] p-2 mb-5 mt-2 mr-4 rounded-md border-gray-400 border-2"
            placeholder="Twitter"
          ></input>

          <label className="text-[1rem] pt-5 ml-1">Facebook</label>
          <input
            className="w-[95%] p-2 mb-5 mt-2 mr-4 rounded-md border-gray-400 border-2"
            placeholder="Facebook"
          ></input>

          <label className="text-[1rem] pt-5 ml-1">Instagram</label>
          <input
            className="w-[95%] p-2 mt-2 mr-4 rounded-md border-gray-400 border-2"
            placeholder="Instagram"
          ></input>
        </div>

        <div className="p-2">
          <h4 className="pt-5 text-[1.6rem] font-bold  text-textForm">Image</h4>

          <p className="text-[1.1rem] font-ligth mr-4 mb-5 pt-1">
            Add a photo to show what your event is about
          </p>

          <div className="w-[100%] ml-[-.2rem] rounded flex flex-col items-center justify-center h-[8rem] bg-[#F4EFFD]">
            <label className="block text-[black] font-semibold mb-4">
              Drag and drop an image or
            </label>
            <input
              className="w-44 px-3 py-2 rounded-lg focus:outline-none focus:ring-2"
              type="file"
              name="event_image"
              placeholder="Upload an image"
            />
          </div>
        </div>

        <Link
          className="w-[100%] ml-[.4rem]"
          href={'/create_event/form_step_3'}
        >
          <button className="mr-4 w-[95%] mt-5 mx-auto h-12 bg-purpleOscuro rounded text-white">
            NEXT
          </button>
        </Link>
      </form>
    </div>
  );
}
