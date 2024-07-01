import React from 'react'
import Leftside from '../Leftsidebar/Leftside'
import Hero from '../herosection/Hero'
import Rightside from '../Rightsidebar/Rightside'
import { useSelector } from 'react-redux'
import useOtherUsers from '../../hooks/useOtherUsers'
import useGetAllTweet from '../../hooks/useGetAllTweet'

const Home = () => {
  
  const {user, otherUsers} = useSelector(store=>store.user);
  useGetAllTweet(user?._id);
  useOtherUsers(user?._id);

  
  return (
    <div className='flex justify-between'>
    <Leftside/>
    <Hero/>
    <Rightside otherUsers={otherUsers}/>
    </div>
  )
}

export default Home
