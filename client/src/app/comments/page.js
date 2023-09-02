"use client"
import React, { useEffect } from 'react'
import CommentCard from '../components/CommentCard/CommentCard'
import axiosIntance from '../../utils/axiosInstance'

export default function Comments() {
    let commentsDB = {}
    useEffect(() => {
        (async () => {
            const { data } = await axiosIntance('/aproveComments')
            commentsDB = data
        })()
    }, [])
  return (
    <div className='min-h-screen flex flex-col w-full items-center font-figtree mt-16'>
        <h2 className='text-[#29154D] text-[30px] font-extrabold tracking-[-1.8px] ml-10 mt-5'>What our customers have to say</h2>
        {commentsDB.length > 0 ? commentsDB.map(comment => <CommentCard props={comment}/>) : null}
    </div>
  )
}
