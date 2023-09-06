"use client";
import React from "react";

export default function PartThree({ formData, setFormData, errors, setErrors, validateEventField }) {

  const handleError = (evt)=>{
    const inputsErrors = { ...errors , [evt.target.name] : evt.target.value }
    const iptError = validateEventField(inputsErrors)
    setErrors(iptError)
  }
  return (
    <div>

<div className="flex flex-row items-center justify-center mr-4 text-black">
        <p className="text-[.8rem]">Step 3 of 4 </p>
        <div className="w-20 h-1 bg-purpleOscuro ml-2 rounded-md"></div>
        <div className="w-8 h-1 bg-[#F4EFFD] rounded-r-md"></div>
      </div>

      <h3 className="pt-5 text-[2rem] font-bold mr-3 text-textForm ">
        More info on the event
      </h3>

      <div>
        <div className="flex flex-col justify-center">
          <h4 className="pt-5 text-[1.6rem] font-bold  text-textForm">
            Summary
          </h4>

          <p className="text-[1.1rem] font-ligth mr-4 pt-1">
            Grab people&apos;s attention with a short description about your
            event. Attendees will see this at the top of your event page. (140
            characters max)
          </p>

          <textarea
            className="shadow-lg mr-5 p-2 w-[95%] h-[10rem] mt-4 border-2 border-purpleNav rounded mx-auto"
            value={formData.intro}
            onChange={(e) => {
              setFormData({ ...formData, intro: e.target.value });
              handleError(e)
            }}
          ></textarea>
        </div>

        <div>
          <h4 className="pt-5 text-[1.6rem] font-bold  text-textForm">
            Description
          </h4>

          <p className="text-[1.1rem] font-ligth mr-4 pt-1">
            Add more details to your event like your schedule, sponsors, or
            featured guests.
          </p>

          <textarea
            className="shadow-lg mr-5 p-2 w-[95%] h-[10rem] mt-4 border-2 border-purpleNav rounded mx-auto"
            value={formData.description}
            onChange={(e) => {
              setFormData({ ...formData, description: e.target.value });
            }}
          ></textarea>
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
            value={formData.social_media[0] || ""}
            onChange={(e) => {
              const updatedSocialMedia = [...formData.social_media];
              updatedSocialMedia[0] = e.target.value;
              setFormData({ ...formData, social_media: updatedSocialMedia });
            }}
          ></input>

          <label className="text-[1rem] pt-5 ml-1">Facebook</label>
          <input
            className="w-[95%] p-2 mb-5 mt-2 mr-4 rounded-md border-gray-400 border-2"
            placeholder="Facebook"
            value={formData.social_media[1] || ""}
            onChange={(e) => {
              const updatedSocialMedia = [...formData.social_media];
              updatedSocialMedia[1] = e.target.value;
              setFormData({ ...formData, social_media: updatedSocialMedia });
            }}
          ></input>

          <label className="text-[1rem] pt-5 ml-1">Instagram</label>
          <input
            className="w-[95%] p-2 mt-2 mr-4 rounded-md border-gray-400 border-2"
            placeholder="Instagram"
            value={formData.social_media[2] || ""}
            onChange={(e) => {
              const updatedSocialMedia = [...formData.social_media];
              updatedSocialMedia[2] = e.target.value;
              setFormData({ ...formData, social_media: updatedSocialMedia });
            }}
          ></input>
        </div>

        <div className="p-2">
          <h4 className="pt-5 text-[1.6rem] font-bold  text-textForm">Image</h4>

          <p className="text-[1.1rem] font-ligth mr-4 mb-5 pt-1">
            Add a photo to show what your event is about
          </p>

          <div className="w-[100%] ml-[-.5rem] rounded flex flex-col items-center justify-center h-[8rem] bg-[#F4EFFD]">
            <label className="block text-[black] font-semibold mb-4">
              Drag and drop an image or
            </label>
            <input
              className="w-44 px-3 py-2 rounded-lg focus:outline-none focus:ring-2"
              type="file"
              name="event_image"
              placeholder="Upload an image"
              onChange={(e) => {
                setFormData({ ...formData, event_image: e.target.files[0] });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
