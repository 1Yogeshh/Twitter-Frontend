import axios from 'axios'
import React from 'react'
import { USER_API_END_POINT } from '../../../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getRefresh } from '../../../redux/tweetSlice'
import { Heart, Trash2 } from 'lucide-react'

const Tweet=({tweet})=> {
    const dispatch=useDispatch();
    const {user}= useSelector(store=>store.user)
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
    <div>
        <div>
            <div>
                <div className='flex gap-5'>
                    <h1>{tweet?.userDetails[0]?.name}</h1>
                    <p>{tweet?.userDetails[0]?.username}   .1m</p>
                </div>
                <div>
                    <p>{tweet?.discription}</p>
                </div>

                <div className='flex gap-10'>
                    <div className='flex gap-5'>
                        <div onClick={()=>likeorDislikeHandler(tweet?._id)} className='hover:bg-blue-200 hover:p-1 hover:rounded'><Heart color='black'/></div>
                        <p>{tweet?.like?.length}</p>
                    </div>
                    <div className='flex gap-5'>
                        <div><p>Comment</p></div>
                        <p>0</p>
                    </div>
                    <div className='flex gap-5'>
                        <div><p>Save</p></div>
                        <p>0</p>
                    </div>
                    {
                        user?._id===tweet?.userId &&(
                        <div className='flex gap-5'>
                            <div  className='hover:bg-blue-200 hover:p-1 hover:rounded hover:cursor-pointer' onClick={()=>deleteTweetHandler(tweet?._id)}><Trash2 /></div>
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
