import React from 'react'
import {Link} from 'react-router-dom'
import { useStateContext } from '../../context/StateContext'

export default function Testbox({test}) {
  const {userDetails} = useStateContext()
  return (
    <>
      {userDetails && (userDetails.type == '2' && userDetails.class == test.className) ? <Link to={`${userDetails.type == '2' ? `/questions/${test.testName.replace(/\s/g, '').toLowerCase()}` : '/home'}`} className='flex flex-row '>
        <div className='w-[10rem] h-[7rem]  shadow-md  border-2 border-teal-500  mt-5 rounded-3xl text-white bg-gray-50'>
          <h6 className='ml-2 mt-2 font-bold text-xl text-black  '>{test.testName}</h6>
          <p className='text-xs ml-2 font-semibold text-black pt-4'>{test.testDesc}</p>
        </div>
      </Link>
      :
      <Link to={`/progress/${test.testName.replace(/\s/g, '').toLowerCase()}`} className='flex flex-row '>
        <div className='w-[10rem] h-[7rem]  shadow-md  border-2 border-teal-500  mt-5 rounded-3xl text-white bg-gray-50'>
          <h6 className='ml-2 mt-2 font-bold text-xl text-black  '>{test.testName}</h6>
          <p className='text-xs ml-2 font-semibold text-black pt-4'>{test.testDesc}</p>
        </div>
      </Link>
      }
    </>
  )
}
