import React from 'react'
import { Link } from 'react-router-dom'

const Rightside=({otherUsers})=> {

 
  return (
    <div className='ml-5'>
      <div>
        <input type='text' className='border-black outline-none bg-white pt-1 pb-1 h-8 rounded  pl-5 mt-5 mr-10 w-96' placeholder='Search'></input>
      </div>

      
            <div className='mt-3'>
                <h1 className=' font-medium text-white mb-3'>Who to Follow</h1>

                {
                  otherUsers?.map((user)=>{
                  return(
                  <div className='border-2 border-gray-400 rounded mb-2 w-[350px] h-20'>
                  <div className='flex' key={user?._id}>
                  <div className='absolute mt-4 ml-5  rounded-full  '>
                        <img className='h-10 w-10 rounded-full' src={user?.image} size="120" round={true} />
                    </div>
                  <div className='ml-16 w-[150px] mt-3'>
                    <h1 className='text-white font-bold'>{user?.name}</h1>
                    <p className='text-white'>@{user?.username}</p>
                </div>
                <div>
                <Link to={`/otherprofile/${user?._id}`}>
                    <button className='bg-blue-500 ml-8 pt-1 pb-1 pl-3 pr-3 rounded mt-4 text-white'>Profile</button>
                </Link>
                </div>
                </div>
                  </div>
                    )
                  })
                }
                
                
            </div>
    </div>
  )
}

export default Rightside
