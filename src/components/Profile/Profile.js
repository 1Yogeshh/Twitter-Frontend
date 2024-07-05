import React from 'react'
import Leftside from '../Leftsidebar/Leftside'
import Rightside from '../Rightsidebar/Rightside'
import { useSelector } from 'react-redux';
import useGetProfile from '../../hooks/useGetProfile';
import useOtherUsers from '../../hooks/useOtherUsers';
import { useNavigate } from 'react-router-dom';


const Profile=()=> {

  const {user, profile, otherUsers}=useSelector(store=>store.user);
  
  useGetProfile(user?._id);
  
  useOtherUsers(user?._id);

  const navigate=useNavigate();



  return (
    <div className='flex justify-between bg-black h-screen'>
      <Leftside/>
      <div>
      <div className='w-[68%] border-r-2 border-gray-400 pr-3  ml-[360px] h-screen'>
            <div>
                <div className='flex items-center py-2'>
                    
                    <div className='ml-2'>
                        <h1 className='font-bold text-lg text-white'>{profile?.name}</h1>
                        <p className='text-gray-500 text-sm '>10 post</p>
                    </div>
                </div>
                <img src="https://pbs.twimg.com/profile_banners/1581707412922200067/1693248932/1080x360" alt="banner" />
                <div className='absolute top-52 ml-2 border-4 border-white rounded-full '>
                    <img className='h-40 rounded-full' src="https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg" size="120" round={true} />
                </div>
                <div className='text-right m-4'>
                <button className='px-4 py-1 text-white hover:text-black hover:bg-gray-200 rounded border border-gray-400' onClick={()=>navigate('/update')}>Edit Profile</button>
                    
                </div>
                <div className='m-4 mt-10'>
                    <h1 className='font-bold text-xl text-white'>{profile?.name}</h1>
                    <p className='text-white'>@{profile?.username}</p>
                </div>
                <div className='flex gap-10 ml-5'>
                <div className=''>
                  <p className='ml-5 text-white'>{user?.followers?.length}</p>
                  <p className='text-white'>followers</p>
                </div>
                <div className=''>
                <p className='ml-5 text-white'>{user?.following?.length}</p>
                  <p className='text-white'>following</p>
                  
                </div>
                </div>
                <div className='m-4 text-sm'>
                    <p className='text-white'> {profile?.name} {profile?.bio}🌐 Exploring the web's endless possibilities with MERN Stack 🚀 | Problem solver by day, coder by night 🌙 | Coffee lover ☕ | Join me on this coding journey!</p>
                </div>
            </div>
        </div>
      </div>
      <Rightside otherUsers={otherUsers}/>
    </div>
  )
}

export default Profile
