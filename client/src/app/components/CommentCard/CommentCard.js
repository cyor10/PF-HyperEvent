import React from "react";

export default function CommentCard({ comment }) {
  function renderStars(rating) {
    const stars = [];
    for (let star = 1; star <= 5; star++) {
      const filled = star <= rating;
      if (filled) {
        stars.push(
          <svg
            key={star}
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5   ${"text-[#FFEC70]"}`}
            fill="none"
            viewBox="0 0 40 40"
            stroke="currentColor"
          >
            <path
              d="M25.6501 8.68333L28.0001 13.3833C28.3167 14.0333 29.1667 14.65 29.8834 14.7833L34.1334 15.4833C36.8501 15.9333 37.4834 17.9 35.5334 19.8667L32.2167 23.1833C31.6667 23.7333 31.3501 24.8167 31.5334 25.6L32.4834 29.7C33.2334 32.9333 31.5001 34.2 28.6501 32.5L24.6667 30.1333C23.9501 29.7 22.7501 29.7 22.0334 30.1333L18.0501 32.5C15.2001 34.1833 13.4667 32.9333 14.2167 29.7L15.1667 25.6C15.3167 24.8 15.0001 23.7167 14.4501 23.1667L11.1334 19.85C9.1834 17.9 9.81673 15.9333 12.5334 15.4667L16.7834 14.7667C17.5001 14.65 18.3501 14.0167 18.6667 13.3667L21.0167 8.66666C22.3001 6.13333 24.3667 6.13333 25.6501 8.68333Z"
              fill={filled ? "#FFEC70" : "#FFF8C9"}
            />
            <path
              d="M13.3333 9.58334H3.33325C2.64992 9.58334 2.08325 9.01668 2.08325 8.33334C2.08325 7.65001 2.64992 7.08334 3.33325 7.08334H13.3333C14.0166 7.08334 14.5833 7.65001 14.5833 8.33334C14.5833 9.01668 14.0166 9.58334 13.3333 9.58334Z"
              fill={filled ? "#FFEC70" : "#FFF8C9"}
            />
            <path
              d="M8.33325 32.9167H3.33325C2.64992 32.9167 2.08325 32.35 2.08325 31.6667C2.08325 30.9833 2.64992 30.4167 3.33325 30.4167H8.33325C9.01659 30.4167 9.58325 30.9833 9.58325 31.6667C9.58325 32.35 9.01659 32.9167 8.33325 32.9167Z"
              fill={filled ? "#FFEC70" : "#FFF8C9"}
            />
            <path
              d="M4.99992 21.25H3.33325C2.64992 21.25 2.08325 20.6833 2.08325 20C2.08325 19.3167 2.64992 18.75 3.33325 18.75H4.99992C5.68325 18.75 6.24992 19.3167 6.24992 20C6.24992 20.6833 5.68325 21.25 4.99992 21.25Z"
              fill={filled ? "#FFEC70" : "#FFF8C9"}
            />
          </svg>
        );
      }
    }
    return stars;
  }

  return (
    <div className="flex flex-col  font-figtree relative w-4/5 min-h-[150px]  max-h-[300px] text-[#29154D] bg-[#DECFFA] border-2 border-[#29154D] rounded-md mt-8 mb-10">
      <div className="flex ml-4">
        <h4 className="mt-4 ml-4 font-semibold">Rating </h4>
        <div className=" mt-4 ml-4  inline-flex ">
          {renderStars(comment.rating)}
        </div>
      </div>
      <p
        className="ml-4 mt-1 px-3 py-2 font-medium pb-16 overflow-hidden overflow-ellipsis whitespace-nowrap"
        style={{
          overflow: "auto", // Permite el desbordamiento automático según el contenido
          whiteSpace: "normal", // Permite dividir automáticamente el texto en líneas
        }}
      >
        &quot;{comment.comment}&quot;
      </p>
      <div className="w-full flex justify-center">
        <img
          src={comment.user.user_image}
          alt={comment.user.name}
          className="rounded-full w-[65 px] h-[70px] border-2 absolute bottom-[-40px]"
        />
        <p
          className="absolute right-4 text-black text-sm"
          style={{
            position: "absolute",
            bottom: "10px", // Ajusta este valor según la distancia que desees entre el comentario y el nombre del usuario
          }}
        >
          -{comment.user.name}
        </p>
      </div>
    </div>
  );
}
