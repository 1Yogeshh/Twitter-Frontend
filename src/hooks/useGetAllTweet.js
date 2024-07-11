import axios from "axios";
import {USER_API_END_POINT} from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweets } from "../redux/tweetSlice";


const useGetAllTweet =  (id) => {
    const dispatch=useDispatch();
    const {refresh, isActive}= useSelector(store=>store.tweet);

    const fetchAllTweets = async () => {
        try {
            const token = localStorage.getItem('authToken'); 
            const res= await axios.get(`${USER_API_END_POINT}/tweet/alltweet/${id}`, {
                withCredentials:true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
            });
            dispatch(getAllTweets(res.data.tweets));
        } catch (error) {
            console.log(error);
        } 
    }

    const followingTweetHandler=async()=>{
        try {
             const token = localStorage.getItem('authToken'); 
            axios.defaults.withCredentials=true;
            const res = await axios.get(`${USER_API_END_POINT}/tweet/followingtweet/${id}`,{
                headers: {
          Authorization: `Bearer ${token}`,
        },
            });
            
            dispatch(getAllTweets(res.data.tweets));
        } catch (error) {
         console.log(error);   
        }
    }


    useEffect(()=>{
        if(isActive){
            fetchAllTweets() ;
        }else{
            followingTweetHandler();
        }
    },[isActive, refresh]);
    

};
export default useGetAllTweet;
