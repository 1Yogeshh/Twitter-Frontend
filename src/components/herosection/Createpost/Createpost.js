import axios from 'axios';
import React, { useState } from 'react'
import { USER_API_END_POINT } from '../../../utils/constant';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getIsActive, getRefresh } from '../../../redux/tweetSlice';
import { getAllTweets } from '../../../redux/tweetSlice';

function Createpost() {
    const [discription,setDiscription]= useState("");
    const {user} =useSelector(store=>store.user);
    const dispatch=useDispatch();
    const {isActive}= useSelector(store=>store.tweet)

    const submitHandler= async ()=>{
        try {
            const res = await axios.post(`${USER_API_END_POINT}/tweet/create`,{discription, id:user?._id},{
                headers:{
                    "Content-Type":"application/json"
                },
                withCredentials:true
            })
            dispatch(getRefresh());
            if(res.data.success){
                toast.success("Tweet created Successfully")
            }
        } catch (error) {
         console.log(error);   
        }
        setDiscription("")
    }

    const forYouHandler=()=>{
        dispatch(getIsActive(true));
    }

    const followingHandler=()=>{
        dispatch(getIsActive(false));
    }
    

  return (
    <>
        <div className='w-[65%] ml-[342px]'>
            <div>
                <div className='flex items-center justify-evenly border-b border-gray-200 w-full mt-5'>
                    <div onClick={forYouHandler}   className={`${isActive ? "border-b-4 border-blue-600" : "border-b-4 border-transparent"} cursor-pointer hover:bg-gray-500 hover:rounded w-full text-center  px-4 py-3`}>
                        <h1 className='font-semibold text-white text-lg'>For you</h1>
                    </div>
                    <div onClick={followingHandler}  className={`${!isActive ? "border-b-4 border-blue-600" : "border-b-4 border-transparent"} cursor-pointer hover:bg-gray-500 hover:rounded w-full text-center px-4 py-3`} >
                        <h1 className='font-semibold text-white text-lg'>Following</h1>
                    </div>
                </div>
                <div >
                    <div className='flex'>
                    <div className='absolute mt-3 ml-5  rounded-full '>
                        <img className='h-12 rounded-full' src="https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg" size="120" round={true} />
                    </div>
                    <div className='ml-14'>
                    <div className='flex items-center p-4'>                    
                        <input value={discription} onChange={(e)=>setDiscription(e.target.value)} className='bg-black text-white w-full outline-none border-none ml-2 font-medium' type="text" placeholder='What is happening?!' />
                    </div>
                    <div className='flex items-center justify-between p-4 '>
                        <button onClick={submitHandler} className='bg-blue-500 pl-5 pr-5 pt-1 pb-1 text-white rounded font-bold ml-[540px]'>Post</button>    
                    </div>
                    </div>
                    </div>
                </div>
            </div>


        </div>
    </>
  )
}

export default Createpost
