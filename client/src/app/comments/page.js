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
    <div className="min-h-screen w-full ml-[5%] font-figtree mt-16 md:mt-32 mb-10">
      <h2 className="mx-auto mt-20 md:mt-32 tracking-[-2.5px] font-bold text-[clamp(2.5rem,6vw,3.5rem)]">
        What our customers have to say
      </h2>
      <div className="grid mx-auto pb-10 pt-6 md:grid-cols-2 gap-6 w-full justify-center">
      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <CommentCard key={index} comment={comment} />
        ))
      ) : (
        <p>No comments available.</p>
      )}
      </div>
    </div>
  );
}
