import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useUserContest = () => {
    const {User}=useAuth();
 
    const axiosPublic=useAxiosPublic();
    const {data:userContests=[],isLoading:loading3}=useQuery({
        queryKey:["userContests",User?.email],
        queryFn:async()=>{
            const res = await axiosPublic.get(`/usercontests/email?email=${User?.email}`);
            return res.data;
        }
    })


    return [userContests,loading3];
};

export default useUserContest;