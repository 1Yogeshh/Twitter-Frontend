import axios from 'axios'
import React from 'react'
import { USER_API_END_POINT } from '../../../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getRefresh } from '../../../redux/tweetSlice'
import { Heart, Trash2 } from 'lucide-react'

const Tweet=({tweet})=> {
    const dispatch=useDispatch();
    const {user, profile}= useSelector(store=>store.user)
    const likeorDislikeHandler= async(id)=>{
        
        try {
            const res= await axios.put(`${USER_API_END_POINT}/tweet/like/${id}`,{id:user?._id},{
                withCredentials:true
            })
            dispatch(getRefresh());
            toast.success(res.data.message)
            
        } catch (error) {
            console.log(error);
        }
    }


    const deleteTweetHandler = async (id)=>{
        try {
            const res = await axios.delete(`${USER_API_END_POINT}/tweet/delete/${id}`,{
                withCredentials:true
            })
            dispatch(getRefresh());
            toast.success(res.data.message);
        } catch (error) {
            console.log(error);
        }
    }


  return (
    <div className='border-gray-500 border-2 mt-2 rounded w-[680px] ml-[342px] mb-5'>
        <div>
            <div>
                <div className='flex gap-5 ml-4'>
                    <div className='absolute mt-5 ml-5   rounded-full '>
                        <img className='h-10 w-10 rounded-full mr-2' src={tweet?.userDetails[0]?.image} size="120"  />
                    </div>
                    <div className='ml-1 mt-1'>
                    <h1 className='ml-16 mt-3 font-medium text-white'>{tweet?.userDetails[0]?.name}</h1>
                    <p className='ml-16 text-sm font-medium text-white'>{tweet?.userDetails[0]?.username}   <span className='text-gray-400'>.1m</span></p>
                    </div>
                </div>
                <div className='ml-20 mt-5 mr-4'>
                    <p className='text-white'>{tweet?.discription}</p>
                </div>

                <div className='flex gap-10 ml-20 mt-5 mb-3'>
                    <div className='flex gap-3'>
                        <div onClick={()=>likeorDislikeHandler(tweet?._id)} className='hover:cursor-pointer hover:text-red-500'><Heart color='Red'/></div>
                        <p className='text-white'>{tweet?.like?.length}</p>
                    </div>
                    {
                        user?._id===tweet?.userId &&(
                        <div className='flex gap-5 ml-96'>
                            <div  className='  hover:cursor-pointer' onClick={()=>deleteTweetHandler(tweet?._id)}><Trash2 color='white' /></div>
                        </div>
                        )
                    }
                </div>
            
            
            </div>

        </div>
    </div>
  )
}

export default Tweet
