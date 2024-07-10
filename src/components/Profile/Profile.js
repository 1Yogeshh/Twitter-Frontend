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
      <div className='w-[68%] border-r-2 border-gray-400 pr-2 pl-2  ml-[360px] h-screen'>
            <div>
                <div className='flex items-center py-2'>
                    
                    <div className='ml-2'>
                        <h1 className='font-bold text-lg text-white'>{profile?.name}</h1>
                    </div>
                </div>
                <div className='h-[300px] w-[700px]'>
                {
                  profile?.bgimage!=null? <img className='h-[300px] w-[700px]' src={profile?.bgimage} alt="banner" />:<img></img>
                
                }
                </div>
                <div className='absolute top-52 ml-2 border-4 border-white rounded-full mt-10 '>
                    <img className='h-40 w-40 rounded-full' src={profile?.image} size="120" />
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
                    <p className='text-white font-medium'>{profile?.bio}</p>
                </div>
            </div>
        </div>
      </div>
      <Rightside otherUsers={otherUsers}/>
    </div>
  )
}

export default Profile
