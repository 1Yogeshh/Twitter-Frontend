import React, { useEffect } from 'react'
import Leftside from '../Leftsidebar/Leftside'
import Hero from '../herosection/Hero'
import Rightside from '../Rightsidebar/Rightside'
import { useSelector } from 'react-redux'
import useOtherUsers from '../../hooks/useOtherUsers'
import useGetAllTweet from '../../hooks/useGetAllTweet'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate=useNavigate();
  const {user, otherUsers} = useSelector(store=>store.user);
  useGetAllTweet(user?._id);
  useOtherUsers(user?._id);

  useEffect(()=>{
    if(!user){
    navigate("/login");
    }
  },[]);

  
  return (
    <div className='flex bg-black justify-between w-[100%] h-screen'>
    <Leftside/>
    <Hero/>
    <Rightside otherUsers={otherUsers}/>
    </div>
  )
}

export default Home
