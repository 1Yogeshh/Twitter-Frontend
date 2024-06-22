import React from 'react'

function index() {
  return (
    <>
         <div className='w-[50%] border-l border-r border-gray-200 ml-20'>
            <div>
                <div className='flex items-center py-2'>
                    
                    <div className='ml-2'>
                        <h1 className='font-bold text-lg'>yogeshkumar</h1>
                        <p className='text-gray-500 text-sm'>10 post</p>
                    </div>
                </div>
                <img src="https://pbs.twimg.com/profile_banners/1581707412922200067/1693248932/1080x360" alt="banner" />
                <div className='absolute top-52 ml-2 border-4 border-white rounded-full mt-5'>
                    <img className='h-40 rounded-full' src="https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg" size="120" round={true} />
                </div>
                <div className='text-right m-4'>
                <button className='px-4 py-1 hover:bg-gray-200 rounded-full border border-gray-400'>Edit Profile</button>
                    
                </div>
                <div className='m-4'>
                    <h1 className='font-bold text-xl'>yash</h1>
                    <p>@yogeshkumar</p>
                </div>
                <div className='m-4 text-sm'>
                    <p>🌐 Exploring the web's endless possibilities with MERN Stack 🚀 | Problem solver by day, coder by night 🌙 | Coffee lover ☕ | Join me on this coding journey!</p>
                </div>
            </div>
        </div>
    </>
  )
}

export default index
