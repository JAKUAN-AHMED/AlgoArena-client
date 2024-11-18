import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useContests = () => {
    const axiosPublic=useAxiosPublic();
    const {refetch,data:contests=[],isLoading:loading1}=useQuery({
        queryKey:['contests'],
        queryFn:async()=>{
            const res=await axiosPublic.get("/contests");
  
            return res.data;
        }
    })
    return [contests,refetch,loading1];
};

export default useContests;