import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";

const useCreatorContest = () => {
    const {User,loading}=useAuth();
    const axiosPublic=useAxiosPublic();
   const {refetch,data:contestData=[]}=useQuery({
    queryKey:['contestData',User?.email],
    queryFn:async()=>{
        const res=await axiosPublic.get(`/contests/email?email=${User?.email}`)
        return res.data; 
    }
   });
   return [contestData,refetch];

};

export default useCreatorContest;