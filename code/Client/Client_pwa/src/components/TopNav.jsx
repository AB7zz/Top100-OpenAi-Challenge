import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import Person2Icon from '@mui/icons-material/Person2';

const TopNav = () => {
    const handleLogout = () =>{
        localStorage.removeItem('uid')
        localStorage.removeItem('accessToken')
        window.location.replace('/login')
    }
  return (
    <div className='bg-white px-3 py-3'>
        <div className='flex justify-between items-center'>
            <img className='w-[50px]' src="/capgpt.png" />
            <LogoutIcon onClick={handleLogout} className='!text-4xl' />
        </div>
    </div>
  )
}

export default TopNav