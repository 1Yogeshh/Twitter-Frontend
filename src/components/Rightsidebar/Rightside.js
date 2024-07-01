import React from 'react'
import { Link } from 'react-router-dom'

const Rightside=({otherUsers})=> {

 
  return (
    <div>
      <div>
        <input type='text' className='border-black outline-none bg-gray-300 h-8 rounded-full pl-5 mt-5 mr-10 w-96'></input>
      </div>

      
            <div>
                <h1>Who to Follow</h1>

                {
                  otherUsers?.map((user)=>{
                    return(
                      <div className='flex' key={user?._id}>
                <div className=''>
                    <h1>{user?.name}</h1>
                    <p>@{user?.username}</p>
                </div>
                <div>
                <Link to={`/otherprofile/${user?._id}`}>
                    <button className='bg-gray-500'>Profile</button>
                </Link>
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
