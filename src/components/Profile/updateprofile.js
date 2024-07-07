import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '../../utils/constant';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FolderPen } from 'lucide-react';
import { Mail, Pencil, ScrollText } from 'lucide-react';

const UpdateProfile=()=> {
    const {user}= useSelector(store=>store.user)
    const [name, setName]=useState('');
    const [email, setEmail]=useState('');
    const [bio, setBio]=useState('');
    const navigate=useNavigate()
    const updateHandle= async(e)=>{
        e.preventDefault();
        const id= user?._id
        
        try {
            const response = await axios.put(`${USER_API_END_POINT}/api/update/${id}`,{ name, email, bio},{
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
    <div className='flex justify-center items-center align-middle text-center mt-40'>
    <div>
    <h1 className='text-white font-medium text-2xl flex ml-16'> <FolderPen className='mr-2' size={40} color='blue' />update the profile</h1>
    <form>
        <div className='mt-10'>
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
