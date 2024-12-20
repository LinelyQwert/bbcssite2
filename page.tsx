'use client'
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    const authCheck = onAuthStateChanged(auth, (currentUser) =>{
        if(!currentUser){
            router.push("/login")
        }
    })

    return () => authCheck();
  }, []);
}