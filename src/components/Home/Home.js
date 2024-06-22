import React from 'react'
import Leftside from '../Leftsidebar/Leftside'
import Hero from '../herosection/Hero'
import Rightside from '../Rightsidebar/Rightside'

function Home() {
  return (
    <div className='flex justify-between'>
    <Leftside/>
    <Hero/>
    <Rightside/>
    </div>
  )
}

export default Home
