// import { useQuery } from "@tanstack/react-query";
// import useAxiosPublic from "./useAxiosPublic";
// import useAuth from "./useAuth";
// const useSubmissions = () => {
//     const axiosPublic=useAxiosPublic();
//     const {User}=useAuth();
//     console.log('....',User);
//     const {refetch,data:submissions=[]}=useQuery({ 
//         queryKey:["submissions",User?.email],
//         queryFn:async()=>{
//             const res=await axiosPublic.get(`/payment-history/email/?email=${User?.email}`);
//             return res.data;
//         }
//     })
//    return [submissions,refetch];
// };

// export default useSubmissions;