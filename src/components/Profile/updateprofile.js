import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '../../utils/constant';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FolderPen } from 'lucide-react';
import { Mail, Pencil, ScrollText, Camera } from 'lucide-react';

const UpdateProfile=()=> {
    const {user}= useSelector(store=>store.user)
    const [name, setName]=useState('');
    const [email, setEmail]=useState('');
    const [bio, setBio]=useState('');
    const navigate=useNavigate()

    //profile image
    const [image, setImage] = useState(null);
    const [imageLoad, setImageLoad] = useState(false);

    //bgimage
    const [bgImage, setBgImage] = useState(null);
    const [bgImageLoad, setBgImageLoad] = useState(false);


    //profile photo
    const imageChange = (e) => {
      const file = e.target.files[0];
      setImage(file);
    }

    //dom60njrq

    const uploadImage = async () => {
      const data = new FormData();
      data.append('file',image);
      data.append('upload_preset', 'evagczqi');
      try {
        setImageLoad(true);
        let response = await fetch('https://api.cloudinary.com/v1_1/dom60njrq/image/upload', {
          method:'POST',
          body: data,
        })
        let urlData = response.json();
        setImageLoad(false);      
        return urlData;
      } catch (error) {
        console.log(error);
      }
    }

    //bg photo
    const bgImageChange = (e) => {
      const file = e.target.files[0];
      setBgImage(file);
    }

    const uploadBgImage = async () => {
      const data = new FormData();
      data.append('file',bgImage);
      data.append('upload_preset', 'evagczqi');
      try {
        setBgImageLoad(true);
        let response = await fetch('https://api.cloudinary.com/v1_1/dom60njrq/image/upload', {
          method:'POST',
          body: data,
        })
        let urlData = response.json();
        setBgImageLoad(false);      
        return urlData;
      } catch (error) {
        console.log(error);
      }
    }





    const updateHandle= async(e)=>{
        e.preventDefault();
        const id= user?._id
        
        try {
          const url = await uploadImage(image);
          const urldata = await uploadBgImage(bgImage);
            const response = await axios.put(`${USER_API_END_POINT}/api/update/${id}`,{ name, email, bio, image:url.url, bgimage:urldata.url},{
              headers:{
                'Content-Type':"application/json"
              },
              withCredentials:true
            });
          if(response.data.success){
            navigate("/profile");
            toast.success(response.data.message);
          }
        } catch (error) {
          toast.success(error.response.data.message);
          console.log(error);
        }
    }
  return (
    <div className='flex justify-center items-center align-middle text-center mt-20'>
    <div>
    <h1 className='text-white font-medium text-2xl flex ml-16'> <FolderPen className='mr-2' size={40} color='blue' />update the profile</h1>
    <form>
        <p className='text-white mt-5 font-medium flex mb-1'> <Camera color='gold' className='mr-1' />Profile Photo :</p>
           <input onChange={imageChange} className='bg-white form-control w-26 h-10 pt-1 pl-1 font-medium rounded w-96' type="file" />     
        <p className='text-white mt-5 font-medium flex mb-1'> <Camera color='gold' className='mr-1' />Background Photo :</p>
           <input onChange={bgImageChange} className='bg-white form-control w-26 h-10 pt-1 pl-1 font-medium rounded w-96' type="file" />      
        <div className='mt-5'>
            <p className='text-white font-medium flex mb-1'><Pencil className='mr-1' color='yellow' />Name:</p>
            <input
                className='w-96 h-10 pl-2 pr-2 rounded font-medium outline-none'
                type='text'
                placeholder='name'
                value={name}
                onChange={(e)=>setName(e.target.value)}
            />
        </div>
        <div className='mt-5'>
            <p className='text-white flex font-medium mb-1'><Mail className='mr-1' color='red'/>Email:</p>
            <input
                className='w-96 h-10 pl-2 pr-2 rounded font-medium outline-none'
                type='text'
                placeholder='email'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
            />
        </div>
        <div className='mt-5'>
            <p className='text-white flex mb-1 font-medium'> <ScrollText className='mr-1' color='skyblue' />Bio:</p>
            <input
                className='w-96 h-10 pl-2 pr-2 rounded font-medium outline-none'
                type='text'
                placeholder='bio'
                value={bio}
                onChange={(e)=>setBio(e.target.value)}
            />
        </div>
        <div>
            <button onClick={updateHandle} className='bg-blue-700 text-white h-10 pl-2 pr-2 rounded font-medium w-96 mt-10'>Update 🚀</button>
        </div>
    </form>
    </div>
      
    </div>
  )
}

export default UpdateProfile
