import axios from 'axios';
import React,{useState} from 'react'
import { USER_API_END_POINT } from '../../utils/constant';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../redux/userSlice';
import { Twitter } from 'lucide-react';

function Login() {
  const navigate=useNavigate();

    const [isLogin, setIsLogin] = useState(true);
    const [name, setName]= useState("");
    const [username, setUsername]= useState("");
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const dispatch=useDispatch();
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageLoad, setImageLoad] = useState(false);

    const imageChange = (e) => {
      const file = e.target.files[0];
      setImagePreview(URL.createObjectURL(file));
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
          dispatch(getUser(response?.data?.user));
        if(response.data.success){
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
    
  return (
    <>
        <div className='w-screen h-screen flex items-center justify-center bg-black'>
      <div className='flex items-center justify-evenly w-[80%]'>
        <div>
        <Twitter size={200} color='white' />
        </div>
        <div>
          <div className='my-5'>
            <h1 className='font-bold text-6xl text-white'>Happening now.</h1>
          </div>
          <h1 className='mt-4 mb-2 text-2xl font-bold text-white'>{isLogin ? "Login" : "Singup"}</h1>
          <form onSubmit={submitHandler}  className='flex flex-col w-[55%]'>
            {
              !isLogin && (<>
                <div className="">
                   <img className='rounded border-2 border-white mb-2' style={{width:'200px', height:'200px'}} src={imagePreview && imagePreview} alt="" />
                </div>
                <input onChange={imageChange} className='form-control' type="file" />
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)}  placeholder='Name' className=" outline-blue-500 border border-gray-800 px-3 py-2 rounded-md my-1 font-semibold" />
                <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='Username' className="  outline-blue-500 border border-gray-800 px-3 py-2 rounded-md my-1 font-semibold" />
              </>)
            }
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}   placeholder='Email' className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-md my-1 font-semibold" />
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password' className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-md my-1 font-semibold" />
            <button className={`btn w-100 my-3 bg-blue-500 h-10 text-white font-medium rounded ${imageLoad? 'btn-secondary' : 'btn-info'}`}>{isLogin ? "Login" : "Create Account"}</button>
            <h1 className='text-white'>{isLogin ? "Do not have an account?" : "Already have an account?"} <span onClick={loginSignupHandler} className='font-bold text-blue-600 cursor-pointer'>{isLogin ? "Signup" : "Login"}</span></h1>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default Login
