import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { useEffect } from "react";
import {useDispatch} from "react-redux";
import { getOtherUsers } from "../redux/userSlice";

const useOtherUsers = (id) => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchOtherUsers = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await axios.get(`${USER_API_END_POINT}/api/otheruser/${id}`, {
                    withCredentials:true,
                    headers:{
                         Authorization: `Bearer ${token}`
                    }
                });
                dispatch(getOtherUsers(res.data.otherUsers));
            } catch (error) {
                console.log(error);
            }
        };
        fetchOtherUsers();
    },[id , dispatch]);
};
export default useOtherUsers;


    