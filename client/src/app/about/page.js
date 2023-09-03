import React from 'react'

export default function About() {

  return (
    <div className='flex flex-col min-h-screen mt-16 ml-8'>
        <h2 className='font-2xl font-bold mt-10 text-[36px] text-[#29154D] font-figtree -tracking-[1.8px]'>About us</h2>
        <p className='font-figtree text-base font-medium text-black'>We&apos;re a team of seven fullstack developers finishing the challenging Henry coding bootcamp. Our project, Hyper Events, is a testament to our coding skills and collaborative spirit. <br/><br/>We&apos;ve honed our abilities through intensive training and are excited to showcase our innovation. <br/><br/>Hyper Events is more than just a project; it&apos;s a reflection of our shared vision to revolutionize event experiences in the digital age. Join us on this exciting journey as we turn lines of code into groundbreaking solutions. Thank you for being a part of our adventure!</p>
        <div className='flex flex-wrap w-full text-black'><br/>Container developers info:</div>
    </div>
  )
}
