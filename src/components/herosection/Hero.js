import React from 'react'
import Createpost from './Createpost/Createpost'
import Tweet from './Tweet/Tweet'

function Hero() {
  return (
    <>
      <div className=' w-[100%] ml-60'>
      <Createpost/>
      <Tweet/>
      </div>
    </>
  )
}

export default Hero
