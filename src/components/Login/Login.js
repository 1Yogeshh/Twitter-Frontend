import axios from 'axios';
import React,{useState} from 'react'
import { USER_API_END_POINT } from '../../utils/constant';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../redux/userSlice';
import { Twitter, Mail, Lock, Eye, FolderPen, User, Camera } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Login() {
  const navigate=useNavigate();

    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName]= useState("");
    const [username, setUsername]= useState("");
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const dispatch=useDispatch();
    const [image, setImage] = useState(null);
    const [imageLoad, setImageLoad] = useState(false);

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

    const submitHandler= async(e)=>{
      e.preventDefault();
      if(isLogin){
        //login
        try {
          const response = await axios.post(`${USER_API_END_POINT}/api/login`,{ email, password},{
            headers:{
              'Content-Type':"application/json"
            },
            withCredentials:true
          });
          
          
        if(response.data.success){
           document.cookie = `token=${response.data.token}; path=/; Secure; SameSite=None`;
          dispatch(getUser(response.data.user));
          navigate("/");
          toast.success(response.data.message);
        }
      } catch (error) {
        toast.success(error.response.data.message);
        console.log(error);
      }
    }else{
        //signup
        try {
          const url = await uploadImage(image);
          const response = await axios.post(`${USER_API_END_POINT}/api/register`, {
              name,
              username,
              image:url.url,
              email,
              password
            },{
              method:'POST',
              headers:{
                'Content-Type':"application/json"
              },
              withCredentials:true
            })
            .then((response) => {
              if (response.data.success) {
                setIsLogin(true);
                toast.success(response.data.message);
                console.log(response.data)
              } else {
                toast.error(response.data.message);
              }
            });
        } catch (error) {
          console.log(error.response.data);
          toast.error("somthing went wrong");
        }
      }
        
    }

    const loginSignupHandler = () => {
        setIsLogin(!isLogin);
      }

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };  
    
  return (
    <>
        <div className='w-screen h-screen flex items-center justify-center bg-black'>
      <div className='flex items-center justify-evenly '>
        <div>
        <Twitter size={200} color='white' />
        </div>
        <div className='ml-20'>
          <div className='my-5'>
            <h1 className='font-bold text-5xl text-white'>Happening now.</h1>
          </div>
          <h1 className='mt-4 mb-2 text-2xl font-bold text-white'>{isLogin ? "Login" : "Singup"}</h1>
          <form onSubmit={submitHandler}  className='flex flex-col'>
            {
              !isLogin && (<>
                <p className='text-white font-medium flex mb-1'> <Camera color='gold' className='mr-1' />Profile Photo :</p>
                <input onChange={imageChange} className='bg-white form-control w-26 h-10 pt-1 pl-1 font-medium rounded w-96' type="file" />
                <p className='text-white font-medium mt-2 mb-1 flex'>  <User color='blue' className='mr-1' />Name :</p>
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)}  placeholder='Name' className=" outline-none  px-3 py-2 w-96 rounded-md my-1 font-semibold"/>
                <p className='text-white font-medium mt-1 mb-1 flex'>  <FolderPen color='pink' className='mr-1' />Username :</p>
                <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='Username'  className='outline-none  px-3 py-2 w-96 rounded-md my-1 font-semibold' />
              </>)
            }
            <p className='text-white flex mb-1 font-medium mt-1'><Mail color='red' className='mr-1'/>Email :</p>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}   placeholder='Email' className=" outline-none  px-3 py-2 w-96 rounded-md my-1 font-semibold" />
            <p className='text-white flex mb-1 font-medium mt-1'>  <Lock color='yellow' className='mr-1' />Password :</p>
            <div className='flex'>
            <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password' className="outline-none px-3 w-96 py-2 rounded-md my-1 font-semibold" />
            <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                onClick={togglePasswordVisibility}
                style={{ cursor: 'pointer', marginLeft: '-30px' }}
                className='mt-4 h-5'
            />
            </div>
            <button className={`btn w-100 mt-5 my-3 w-96 bg-blue-500 h-10 text-white font-medium rounded ${imageLoad? 'btn-secondary' : 'btn-info'}`}>{isLogin ? "Login" : "Create Account"}</button>
            <h1 className='text-white'>{isLogin ? "Do not have an account?" : "Already have an account?"} <span onClick={loginSignupHandler} className='font-bold text-blue-600 cursor-pointer'>{isLogin ? "Signup" : "Login"}</span></h1>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default Login
