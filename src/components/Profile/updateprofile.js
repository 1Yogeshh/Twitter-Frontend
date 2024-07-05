import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '../../utils/constant';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

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
    <div>
    <h1>update the profile</h1>
    <form>
        <div>
            <p>name:</p>
            <input
                type='text'
                placeholder='name'
                value={name}
                onChange={(e)=>setName(e.target.value)}
            />
        </div>
        <div>
            <p>email:</p>
            <input
                type='text'
                placeholder='name'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
            />
        </div>
        <div>
            <p>bio:</p>
            <input
                type='text'
                placeholder='name'
                value={bio}
                onChange={(e)=>setBio(e.target.value)}
            />
        </div>
        <div>
            <button onClick={updateHandle} className='bg-black text-white p-3 text-xl'>update</button>
        </div>
    </form>
      
    </div>
  )
}

export default UpdateProfile
