import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useUsers = () => {
    const axiosPublic=useAxiosPublic();
    const {refetch,data:users=[],isLoading:loading2}=useQuery({
        queryKey:['users'],
        queryFn:async()=>{
            const res=await axiosPublic.get('/users');
            return res.data;
        }
    });
    
   return [users,refetch,loading2];
};

export default useUsers;