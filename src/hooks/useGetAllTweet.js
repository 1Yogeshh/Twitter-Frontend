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
            const token = document.cookie.split('=')[1];
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const res= await axios.get(`${USER_API_END_POINT}/tweet/alltweet/${id}`, {
                
                withCredentials:true
            });
            dispatch(getAllTweets(res.data.tweets));
        } catch (error) {
            console.log(error);
        } 
    }

    const followingTweetHandler=async()=>{
        try {
            const token = document.cookie.split('=')[1];
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            axios.defaults.withCredentials=true;
            const res = await axios.get(`${USER_API_END_POINT}/tweet/followingtweet/${id}`);
            
            dispatch(getAllTweets(res.data.tweets));
        } catch (error) {
         console.log(error);   
        }
    }


      useEffect(() => {
    const fetchData = async () => {
      if (isActive) {
        await fetchAllTweets();
      } else {
        await followingTweetHandler();
      }
    };

    fetchData();
  }, [isActive, refresh, id]);
    

};
export default useGetAllTweet;
