import React from 'react'
import Leftside from '../Leftsidebar/Leftside'
import Rightside from '../Rightsidebar/Rightside'
import Index from '../Profile/index'

function Profile() {
  return (
    <div className='flex justify-between'>
      <Leftside/>
      <Index/>
      <Rightside/>
    </div>
  )
}

export default Profile
