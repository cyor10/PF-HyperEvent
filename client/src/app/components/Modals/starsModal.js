"use client";
import React from "react";
import Modal from "react-modal";
import { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";

export default function StarsModal({ isOpen, onRequestClose, onNextClick }) {
  const [rating, setRating] = useState(0);

  const handleStarClick = (newRating) => {
    setRating(newRating);
  };

  const handleNext = () => {
    onNextClick(rating);
    onRequestClose();
  };

  return (
    <Modal
      className="font-figtree fixed inset-0 flex items-center justify-center"
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <div className="flex relative flex-col items-center w-80 h-80 bg-white border-4 pr-5 pl-5 rounded-lg border-purpleNav">
        <div className="absolute right-0" onClick={onRequestClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
          >
            <path
              d="M19.9999 36.6666C29.1666 36.6666 36.6666 29.1666 36.6666 20C36.6666 10.8333 29.1666 3.33331 19.9999 3.33331C10.8333 3.33331 3.33325 10.8333 3.33325 20C3.33325 29.1666 10.8333 36.6666 19.9999 36.6666Z"
              stroke="#292D32"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.2834 24.7167L24.7168 15.2833"
              stroke="#292D32"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M24.7168 24.7167L15.2834 15.2833"
              stroke="#292D32"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="text-xl text-[#29154D] font-bold mt-10 tracking-custom">
          Hey there! Just a quick survey to help us improve :)
        </h3>
        <p className="text-base font-medium text-black mt-4">
          How would you rate the overall experience of Hyper Events?
        </p>
        <div className="flex items-center w-full justify-evenly h-10 mt-4 space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              xmlns="http://www.w3.org/2000/svg"
              className={`h-10 w-10 cursor-pointer ${
                star <= rating ? "text-[#FFEC70]" : "text-[#FFF8C9]"
              }`}
              fill="none"
              viewBox="0 0 40 40"
              stroke="currentColor"
              onClick={() => handleStarClick(star)}
            >
              <path
                d="M25.6501 8.68333L28.0001 13.3833C28.3167 14.0333 29.1667 14.65 29.8834 14.7833L34.1334 15.4833C36.8501 15.9333 37.4834 17.9 35.5334 19.8667L32.2167 23.1833C31.6667 23.7333 31.3501 24.8167 31.5334 25.6L32.4834 29.7C33.2334 32.9333 31.5001 34.2 28.6501 32.5L24.6667 30.1333C23.9501 29.7 22.7501 29.7 22.0334 30.1333L18.0501 32.5C15.2001 34.1833 13.4667 32.9333 14.2167 29.7L15.1667 25.6C15.3167 24.8 15.0001 23.7167 14.4501 23.1667L11.1334 19.85C9.1834 17.9 9.81673 15.9333 12.5334 15.4667L16.7834 14.7667C17.5001 14.65 18.3501 14.0167 18.6667 13.3667L21.0167 8.66666C22.3001 6.13333 24.3667 6.13333 25.6501 8.68333Z"
                fill={star <= rating ? "#FFEC70" : "#FFF8C9"}
              />
              <path
                d="M13.3333 9.58334H3.33325C2.64992 9.58334 2.08325 9.01668 2.08325 8.33334C2.08325 7.65001 2.64992 7.08334 3.33325 7.08334H13.3333C14.0166 7.08334 14.5833 7.65001 14.5833 8.33334C14.5833 9.01668 14.0166 9.58334 13.3333 9.58334Z"
                fill={star <= rating ? "#FFEC70" : "#FFF8C9"}
              />
              <path
                d="M8.33325 32.9167H3.33325C2.64992 32.9167 2.08325 32.35 2.08325 31.6667C2.08325 30.9833 2.64992 30.4167 3.33325 30.4167H8.33325C9.01659 30.4167 9.58325 30.9833 9.58325 31.6667C9.58325 32.35 9.01659 32.9167 8.33325 32.9167Z"
                fill={star <= rating ? "#FFEC70" : "#FFF8C9"}
              />
              <path
                d="M4.99992 21.25H3.33325C2.64992 21.25 2.08325 20.6833 2.08325 20C2.08325 19.3167 2.64992 18.75 3.33325 18.75H4.99992C5.68325 18.75 6.24992 19.3167 6.24992 20C6.24992 20.6833 5.68325 21.25 4.99992 21.25Z"
                fill={star <= rating ? "#FFEC70" : "#FFF8C9"}
              />
            </svg>
          ))}
        </div>
        <div className="flex mt-1">
          <p className="text-xs text-black mr-[85px]">Very bad</p>
          <p className="text-xs text-black ml-[85px]">Very good</p>
        </div>
        <button
          className="bg-purpleOscuro flex justify-center items-center w-48 h-8 text-white px-4 py-2 rounded mt-5"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </Modal>
  );
}
