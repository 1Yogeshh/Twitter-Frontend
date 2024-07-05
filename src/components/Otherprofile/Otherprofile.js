import React from 'react'
import Leftside from '../Leftsidebar/Leftside'
import Rightside from '../Rightsidebar/Rightside'
import { useSelector } from 'react-redux';
import useGetProfile from '../../hooks/useGetProfile';
import useOtherUsers from '../../hooks/useOtherUsers';
import { useParams } from 'react-router-dom';
 import { toast } from 'react-toastify';
 import axios from 'axios';
 import { useDispatch } from 'react-redux';
 import { USER_API_END_POINT } from '../../utils/constant';
 import { getRefresh } from '../../redux/tweetSlice';
 import { followingUpdate } from '../../redux/userSlice';


const Otherprofile=()=> {

  const {user, profile, otherUsers}=useSelector(store=>store.user);
  const {id} =useParams();
  useGetProfile(id);
  
  useOtherUsers(user?._id);
  const dispatch=useDispatch();

  const followAndUnfollowHandler = async () => {
    if(user.following.includes(id)){
        // unfollow
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${USER_API_END_POINT}/api/unfollow/${id}`, {id:user?._id});
            console.log(res);
            dispatch(followingUpdate(id));
            dispatch(getRefresh());
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
        
    }else{
        // follow
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${USER_API_END_POINT}/api/follow/${id}`, {id:user?._id});
            console.log(res);
            dispatch(followingUpdate(id));
            dispatch(getRefresh());
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.res.data.message);
            console.log(error);
        }
    }
}



  return (
    <div className='flex justify-between bg-black h-screen'>
      <Leftside/>
      <div>
      <div className='w-[60%] ml-[380px]'>
            <div>
                <div className='flex items-center py-2'>
                    
                    <div className='ml-2'>
                        <h1 className='font-bold text-lg text-white'>{profile?.name}</h1>
                        <p className='text-gray-500 text-sm'>10 post</p>
                    </div>
                </div>
                <img src="https://pbs.twimg.com/profile_banners/1581707412922200067/1693248932/1080x360" alt="banner" />
                <div className='absolute top-52 ml-4 mt-16 border-4 border-white rounded-full '>
                    <img className='h-40 rounded-full' src="https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg" size="120" round={true} />
                </div>
                <div className='text-right m-4'>
                <button onClick={followAndUnfollowHandler} className='px-4 py-1 hover:bg-gray-100 rounded-full border border-gray-400 bg-black text-white hover:text-black'>{user?.following.includes(id)?"Following":"Follow"}</button>
                    
                </div>
                <div className='m-4 mt-10 ml-10 text-white'>
                    <h1 className='font-bold text-xl'>{profile?.name}</h1>
                    <p>@{profile?.username}</p>
                </div>
                <div className='flex gap-10 ml-10'>
                <div className=' text-white'>
                <p className='ml-5 text-white'>{profile?.followers?.length}</p>
                  <p>followers</p>
                  
                </div>
                <div className=' text-white'>
                <p className='ml-5'>{profile?.following?.length}</p>
                  <p>following</p>
                  
                </div>
                </div>
                <div className='m-4 text-sm text-white'>
                    <p> {profile?.name}🌐{profile?.bio} Exploring the web's endless possibilities with MERN Stack 🚀 | Problem solver by day, coder by night 🌙 | Coffee lover ☕ | Join me on this coding journey!</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Otherprofile
