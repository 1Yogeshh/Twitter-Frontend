import React from 'react'
import Createpost from './Createpost/Createpost'
import Tweet from './Tweet/Tweet'
import { useSelector } from 'react-redux'

const Hero=()=> {

  const {tweets}= useSelector(store=>store.tweet);

  return (
    <>
      <div className=' w-[70%] ml-10 border-r-2 border-gray-400 pr-5'>
      <Createpost/>
      {
        tweets?.map((tweet) => <Tweet key={tweet?._id} tweet={tweet}/>)
      }
      </div>
    </>
  )
}

export default Hero
