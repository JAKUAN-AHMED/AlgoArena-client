import React, { useEffect, useState } from 'react';
import useUsers from './useUsers';
import useAuth from './useAuth';

const useRole = () => {
    const [Users]=useUsers();
    const [isAdmin,setAdmin]=useState(false);
    const [isCreator,setCreator]=useState(false);
    const [isUser,setUser]=useState(false);
    const {User}=useAuth();
    useEffect(() => {
      const user = Users.find((user) => user?.email === User?.email);
      if (user?.role === "Admin") {
        setAdmin(true);
      } else if (user?.role === "Creator") {
        setCreator(true);
      } else {
        setUser(true);
      }
    }, [Users, User]);
    return [isAdmin,isCreator,isUser];
};

export default useRole;