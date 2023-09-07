"use client";
import React, { useEffect, useState } from "react";
import CommentCard from "../components/CommentCard/CommentCard";
import axiosIntance from "../../utils/axiosInstance";
import { comment } from "postcss";

export default function Comments() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await axiosIntance("/aproveComments");
        setComments(data);
      } catch (error) {
        console.error("Error al obtener comentarios:", error);
      }
    };

    fetchComments();
  }, []);

  return (
    <div className="min-h-screen flex flex-col w-full items-center font-figtree mt-16 mb-10">
      <h2 className="text-[#29154D] text-[30px] font-extrabold tracking-[-1.8px] ml-10 mt-5">
        What our customers have to say
      </h2>
      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <CommentCard key={index} comment={comment} />
        ))
      ) : (
        <p>No comments available.</p>
      )}
    </div>
  );
}
