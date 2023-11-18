import React from 'react'

export default function Classbox({section}) {
  return (
    
    <div className='flex flex-row mt-5 '>

    <div className='w-[10rem] h-[7rem]  shadow-md  border-2 border-teal-500   rounded-3xl text-white bg-gray-50 justify-center items-center flex'>
      <h6 className=' font-bold text-2xl text-black  '>Class {section}</h6>
      {/* <p className='text-xs ml-2 font-semibold text-black pt-4'>Description DescriptionDescription Description</p> */}
    </div>
  </div>
  )
}
