import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://algoarena-server-6679.onrender.com",
});
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;