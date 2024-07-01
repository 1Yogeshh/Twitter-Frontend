import axios from "axios";
import {USER_API_END_POINT} from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweets } from "../redux/tweetSlice";


const useGetAllTweet =  (id) => {
    const dispatch=useDispatch();
    const {refresh}= useSelector(store=>store.tweet);
    useEffect(()=>{
        const fetchAllTweets = async () => {
            try {
                const res= await axios.get(`${USER_API_END_POINT}/tweet/alltweet/${id}`, {
                    withCredentials:true
                });
                console.log(res);
                dispatch(getAllTweets(res.data.tweets));
            } catch (error) {
                console.log(error);
            } 
        }
       fetchAllTweets() ;
    },[refresh]);
    

};
export default useGetAllTweet;