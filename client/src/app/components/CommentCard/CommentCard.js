import React from 'react'

export default function CommentCard({ props }) {
  return (
    <div className='flex flex-col font-figtree relative w-4/5 min-h-[230px] text-[#29154D] bg-[#DECFFA] border-2 border-[#29154D] rounded-md mt-8 mb-6'>
        <div className='flex ml-4'>
            <h4 className='mt-4 font-semibold'>Rating</h4>
            {}
        </div>
        <p className='ml-4 mt-1 pt-1 font-medium'>"Hyper Events has made event discovery and booking a breeze, and their personalized recommendations have introduced me to some fantastic gatherings I wouldn't have found otherwise."</p>
        <div className='w-full flex justify-center'>
            <img src='' alt='' className='rounded-full w-[75px] h-[80px] border-2 absolute bottom-[-40px]'/>
            <p className='absolute right-4 text-black text-sm'>-John Doe</p>
        </div>
    </div>
  )
}
