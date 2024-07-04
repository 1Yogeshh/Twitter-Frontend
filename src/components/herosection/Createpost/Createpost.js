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
        <div className='w-[60%]'>
            <div>
                <div className='flex items-center justify-evenly border-b border-gray-200'>
                    <div onClick={forYouHandler}   className={`${isActive ? "border-b-4 border-blue-600" : "border-b-4 border-transparent"} cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`}>
                        <h1 className='font-semibold text-gray-600 text-lg'>For you</h1>
                    </div>
                    <div onClick={followingHandler}  className={`${!isActive ? "border-b-4 border-blue-600" : "border-b-4 border-transparent"} cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`} >
                        <h1 className='font-semibold text-gray-600 text-lg'>Following</h1>
                    </div>
                </div>
                <div >
                    <div className='flex items-center p-4'>
                        <div>
                        </div>
                        <input value={discription} onChange={(e)=>setDiscription(e.target.value)} className='w-full outline-none border-none text-xl ml-2' type="text" placeholder='What is happening?!' />
                    </div>
                    <div className='flex items-center justify-between p-4 border-b border-gray-300'>
                        <div>
                        <button onClick={submitHandler} className='bg-blue-500 pl-5 pr-5 pt-1 pb-1 text-white rounded text-xl'>Post</button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </>
  )
}

export default Createpost
