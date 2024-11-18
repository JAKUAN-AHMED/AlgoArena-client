import { useState } from "react";

const useWinner = () => {
    const [Winner,setWinner]=useState("");
    // console.log("Winner",Winner);
    return [Winner,setWinner];

    
};

export default useWinner;