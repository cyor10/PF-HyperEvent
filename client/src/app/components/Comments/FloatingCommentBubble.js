import { Comments } from '@/utils/svg/svg';
import React, { useState } from 'react';

const FloatingCommentBubble = ({ comments }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [commentList, setCommentList] = useState(comments);

  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      setCommentList([...commentList, newComment]);
      setNewComment('');
    }
  };
  return (
    <div className="cursor-pointer fixed bottom-10 right-4 transition-transform duration-600 ease-in-out transform hover:scale-600">

      <button
        className={`bg-transparent hover:bg-transparent text-white mr-2 rounded-full w-12 h-12 flex items-center justify-center  ${isOpen ? 'scale-105' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <Comments /> : <Comments />}
      </button>
      <div className={`${isOpen ? 'block' : 'hidden'} bg-purple-400 p-4 mt-2 w-80 max-h-60 overflow-y-auto duration-600 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
        <h2 className="text-lg  font-semibold mb-4">Comentarios</h2>
        <ul className="space-y-2">
          {comments.map((comment, index) => (
            <li key={index} className="border-b pb-2 text-black ">
              {comment}
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <textarea
            className="w-full p-2 border rounded text-black"
            placeholder="Escribe tu comentario..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            className="mt-2 bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2"
            onClick={handleAddComment}
          >
            Agregar comentario
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatingCommentBubble;
