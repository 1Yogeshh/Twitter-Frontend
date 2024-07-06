import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { USER_API_END_POINT } from '../../utils/constant'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { getMyProfile, getOtherUsers, getUser } from '../../redux/userSlice'
import { House } from 'lucide-react'
import { ListCollapse } from 'lucide-react';
import { Aperture } from 'lucide-react';
import { LogOut } from 'lucide-react';
import { useSelector } from 'react-redux'
import { Twitter } from 'lucide-react';

function Leftside() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {user, profile, otherUsers}=useSelector(store=>store.user);
    const logoutHandler= async()=>{
        try {
            const res= await axios.get(`${USER_API_END_POINT}/api/logout`);
            dispatch(getUser(null))
            dispatch(getOtherUsers(null))
            dispatch(getMyProfile(null))
            navigate('/login')
            toast.success(res.data.message);
            
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className=' ml-10 border-r-2 w-[20%] border-gray-400 h-[800px] fixed '>

        <div className=' mt-5 flex ml-5 hover:cursor-pointer'>
        <Twitter size={40} color='white' />
        </div>
        <div className='mt-10 hover:cursor-pointer'>
        <button className='flex gap-2 font-medium text-white' onClick={()=>navigate('/')}> <House color="white" size="30" />Home</button>
        </div>
        <div className='mt-10 flex hover:cursor-pointer'>
        <Aperture size={30}  color='white'/>
            <p className='ml-2 font-medium text-white'>Explore</p>
        </div>
        <div className='mt-10 flex hover:cursor-pointer'>
            <div className='absolute   rounded-full '>
                <img className='h-8 w-8 rounded-full mr-2' src={profile?.image} size="120" round={true} />
            </div>
            <button className='ml-10 font-medium text-white' onClick={()=>navigate('/profile')}>profile</button>
        </div>
        <div className=' flex mt-80 hover:cursor-pointer'>
        <ListCollapse size={30} color='white' /><p className='ml-2 font-medium text-white'>More</p>
        </div>
        <div className='mt-10 flex hover:cursor-pointer' onClick={logoutHandler}>
        <LogOut size={30} color='white' />
            <button className='ml-2 font-medium text-white'>Logout</button>
        </div>
    </div>
  )
}

export default Leftside
