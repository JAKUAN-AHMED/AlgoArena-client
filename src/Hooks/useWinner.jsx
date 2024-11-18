import { useState } from "react";

const useWinner = () => {
    const [Winner,setWinner]=useState("");
    return [Winner,setWinner];

    
};

export default useWinner;