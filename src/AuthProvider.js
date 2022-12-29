import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth'
import app from './firebase/firebase.init';

const auth=getAuth(app)
const googleAuth= new GoogleAuthProvider();
const githubAuth= new GithubAuthProvider()
export const userAuth=createContext();



const AuthProvider = ({children}) => {
    const [user,setUser]=useState('')
    const [loader,setLoader]=useState(false)
    const createUserEmail=(email,password)=>{        
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const updateUserInfo=(userUpdateData)=>{
        return updateProfile(auth.currentUser,userUpdateData)
    }
    const createUserGoogle=()=>{
        return signInWithPopup(auth,googleAuth)
    }
    const createUserGithub=()=>{
        return signInWithPopup(auth,githubAuth)
    }
    const loginWithEmail=(email,password)=>{
        return signInWithEmailAndPassword(auth,email,password)
    }
    const logOut=()=>{
        return signOut(auth)
    }
    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser);
        })
        return ()=>unsubscribe();
    },[])
    const userInfo={
        createUserEmail,
        updateUserInfo,
        createUserGoogle,
        loginWithEmail,
        user,
        loader,
        setLoader,
        createUserGithub,
        logOut
    }
    return (
        <div>
            <userAuth.Provider value={userInfo}>
                {children}
            </userAuth.Provider>            
        </div>
    );
};

export default AuthProvider;