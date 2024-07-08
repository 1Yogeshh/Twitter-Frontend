import axios from 'axios';
import React, { useState } from 'react'
import { USER_API_END_POINT } from '../../../utils/constant';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getIsActive, getRefresh } from '../../../redux/tweetSlice';
import { getAllTweets } from '../../../redux/tweetSlice';
import { Images } from 'lucide-react';

function Createpost() {
    const [discription,setDiscription]= useState("");
    const {user, profile} =useSelector(store=>store.user);
    const [img, setImg] = useState(null);
    const [imgLoad, setImgLoad] = useState(false);
    const [imgPreview, setImgPreview] = useState(null);
    const dispatch=useDispatch();
    const {isActive}= useSelector(store=>store.tweet)


    

    const imgChange = (e) => {
        const file = e.target.files[0];
        setImgPreview(URL.createObjectURL(file));
        setImg(file);
    }

    const uploadImg = async () => {
        const data = new FormData();
        data.append('file',img);
        data.append('upload_preset', 'evagczqi');
        try {
          setImgLoad(true);
          let response = await fetch('https://api.cloudinary.com/v1_1/dom60njrq/image/upload', {
            method:'POST',
            body: data,
          })
          let urlData = response.json();
          setImgLoad(false);      
          return urlData;
        } catch (error) {
          console.log(error);
        }
        setImg(null)
      }

    const submitHandler= async (e)=>{
        try {
            const url = await uploadImg(img);
            const res = await axios.post(`${USER_API_END_POINT}/tweet/create`,{discription,img:url.url, id:user?._id},{
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
        setDiscription("");
        uploadImg(null)
        setImgPreview(null)
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
                <div  className='mt-2 h-40'>
                    <div className='flex'>
                    <div className='absolute mt-3 ml-5  rounded-full '>
                        <img className='h-12 w-12 rounded-full' src={user?.image} size="120" />
                    </div>
                    <div className='ml-14'>
                    <div className='flex items-center p-4'>                    
                        <input value={discription} onChange={(e)=>setDiscription(e.target.value)} className='bg-black text-white w-full outline-none border-none ml-2 font-medium' type="text" placeholder='What is happening?!' />
                    </div>
                    <div className='flex'>
                    <div className='flex mt-10 h-4'> 
                    <Images color='white' className='mt-1'/>
                    <input onChange={imgChange} className=' bg-white form-control h-8 pt-1 pl-1 font-medium text-sm rounded w-24 ml-2 ' type="file" />
                    </div>
                
                    <div className='flex items-center justify-between p-4 '>
                        <button onClick={submitHandler} className='bg-blue-500 pl-5 pr-5 pt-1 pb-1 text-white rounded font-bold ml-[380px] mt-7 '>Post</button>    
                    </div>
                    </div>
                    </div>
                    
                    </div>
                    
                </div>
                {imgPreview && (
                    <div className="container col-lg-4 m-auto border p-2 h-96 w-96">
                        <img style={{ width: '100%', height: '100%' }} src={imgPreview} alt="Preview" />
                    </div>
                )}
            </div>


        </div>
    </>
  )
}

export default Createpost
