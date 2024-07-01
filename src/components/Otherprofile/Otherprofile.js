import React from 'react'
import Leftside from '../Leftsidebar/Leftside'
import Rightside from '../Rightsidebar/Rightside'
import { useSelector } from 'react-redux';
import useGetProfile from '../../hooks/useGetProfile';
import useOtherUsers from '../../hooks/useOtherUsers';
import { useParams } from 'react-router-dom';


const Otherprofile=()=> {

  const {user, profile, otherUsers}=useSelector(store=>store.user);
  const {id} =useParams();
  useGetProfile(id);
  
  useOtherUsers(user?._id);



  return (
    <div className='flex justify-between'>
      <Leftside/>
      <div>
      <div className='w-[70%] border-l border-r border-gray-200 ml-20'>
            <div>
                <div className='flex items-center py-2'>
                    
                    <div className='ml-2'>
                        <h1 className='font-bold text-lg'>{profile?.name}</h1>
                        <p className='text-gray-500 text-sm'>10 post</p>
                    </div>
                </div>
                <img src="https://pbs.twimg.com/profile_banners/1581707412922200067/1693248932/1080x360" alt="banner" />
                <div className='absolute top-52 ml-2 border-4 border-white rounded-full '>
                    <img className='h-40 rounded-full' src="https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg" size="120" round={true} />
                </div>
                <div className='text-right m-4'>
                <button className='px-4 py-1 hover:bg-gray-200 rounded-full border border-gray-400'>Edit Profile</button>
                    
                </div>
                <div className='m-4 mt-10'>
                    <h1 className='font-bold text-xl'>{profile?.name}</h1>
                    <p>@{profile?.username}</p>
                </div>
                <div className='m-4 text-sm'>
                    <p> {profile?.name}🌐 Exploring the web's endless possibilities with MERN Stack 🚀 | Problem solver by day, coder by night 🌙 | Coffee lover ☕ | Join me on this coding journey!</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Otherprofile
