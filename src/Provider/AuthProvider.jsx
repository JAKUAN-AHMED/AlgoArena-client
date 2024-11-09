import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  GoogleAuthProvider,
} from "firebase/auth";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import app from "../Firebase/firebase.config";
export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic=useAxiosPublic();
  const auth=getAuth(app)
  const CreateUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const LogIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const LogOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const provider = new GoogleAuthProvider();
  const google = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };
  //state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); 
      if(currentUser)
      {
        const userInfo={email:currentUser?.email};
        axiosPublic.post('/jwt',userInfo).then((res)=>{
          if(res.data.token)
          {
            localStorage.setItem('access-token',res.data.token);
          }
        })
      }
      else{
        localStorage.removeItem('access-token');
      }
      console.log('current user = ',currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);
  const profile = (user, name,photo) => {
    return updateProfile(user, {
      displayName: name,
      photoURL:photo,
    });
  };

  const AuthInfo = {
    user,
    loading,
    CreateUser,
    LogIn,
    LogOut,
    google,
    profile,
  };
  return (
    <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
