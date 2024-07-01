import React from 'react'
import { useNavigate } from 'react-router-dom'

function Leftside() {
    const navigate=useNavigate()
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
    </div>
  )
}

export default Leftside
