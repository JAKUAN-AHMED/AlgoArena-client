import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useContests = () => {
    const axiosPublic=useAxiosPublic();
    const {refetch,data:contests=[]}=useQuery({
        queryKey:['contest'],
        queryFn:async()=>{
            const res=await axiosPublic.get("contests");
            return res.data;
        }
    })
    return [contests,refetch];
};

export default useContests;