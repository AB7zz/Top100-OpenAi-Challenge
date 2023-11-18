import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import { useStateContext } from '../context/StateContext';
import NotesIcon from '@mui/icons-material/Notes';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

const BotNav = () => {
    const {userDetails} = useStateContext()
  return (
    <div className='bg-white px-3 !py-1 fixed bottom-0 w-[95%]'>
        <div className='flex justify-between'>
            <Link to='/home'>
                <HomeIcon />
            </Link>
            {(userDetails.type == "0" || userDetails.type == "1") ? 
            <Link to='/test'>
                <AddIcon className='!text-4xl' />
            </Link>
            :
            <Link to='/home'>
               <DonutSmallIcon className='!text-4xl' />
            </Link>
            }
            <Link to='/progress/test1'>
                <NotesIcon className='!text-4xl' />
            </Link>
        </div>
    </div>
  )
}

export default BotNav