import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { USER_API_END_POINT } from '../../utils/constant'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { getMyProfile, getOtherUsers, getUser } from '../../redux/userSlice'

function Leftside() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
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
    <div className='mt-20 ml-20'>
        <div className='mt-10'>
        <button onClick={()=>navigate('/')}>Home</button>
        </div>
        <div className='mt-10'>
            <p>Explore</p>
        </div>
        <div className='mt-10'>
            <button onClick={()=>navigate('/profile')}>profile</button>
        </div>
        <div className='mt-10'>
            <p>More</p>
        </div>
        <div className='mt-10'>
            <button>Post</button>
        </div>
        <div className='mt-10' onClick={logoutHandler}>
            <button>Logout</button>
        </div>
    </div>
  )
}

export default Leftside
