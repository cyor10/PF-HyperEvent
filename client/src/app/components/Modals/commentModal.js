"use client"
import React from 'react'
import Modal from 'react-modal'
import { useState } from 'react';

export default function CommentModal({ isOpen, onRequestClose, onNextClick }) {
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
            <div className="flex relative flex-col bg-white rounded-lg border-purpleNav border-4 h-80 w-80 pr-4 pl-4">
                <div className='absolute right-0 cursor-pointer' onClick={onRequestClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <path d="M19.9999 36.6667C29.1666 36.6667 36.6666 29.1667 36.6666 20C36.6666 10.8333 29.1666 3.33334 19.9999 3.33334C10.8333 3.33334 3.33325 10.8333 3.33325 20C3.33325 29.1667 10.8333 36.6667 19.9999 36.6667Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M15.2834 24.7167L24.7168 15.2833" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M24.7168 24.7167L15.2834 15.2833" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <h2 className="text-xl mb-4 text-[#29154D] mt-11 tracking-custom font-bold">Leave us a comment!</h2>
                <textarea className='border-2 rounded-lg min-h-[100px] pl-4 pt-2' placeholder='I have feedback on...'></textarea>
                <div className='flex flex-col items-center'>
                    <button
                        className="flex justify-center w-48 bg-purpleOscuro text-white px-4 py-2 rounded mt-7 cursor-pointer"
                        onClick={handleNext}
                    >   
                    Next
                    </button>
                    <p className='text-[#BE9FF6] mt-3 text-sm underline cursor-pointer' onClick={"cambiar"}>Skip comment</p>
                </div>
            </div>
        </Modal>
    );
};
