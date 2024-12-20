'use client'

import {onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/app/firebase";
import {useRouter} from "next/navigation";
import {useEffect} from "react";


export default function Page(){
    const router = useRouter();

    function redirect(path : string){
        router.push("/" + path)
    }

    useEffect(() => {
        const authCheck = onAuthStateChanged(auth, (currentUser) =>{
            if(!currentUser){
                router.push("/login")
            }
        })
        return () => authCheck();
    }, [router])

    return (<>
        <div id="wrapper" className="bg-[#FFF8E7] min-h-svh">
            <div
                id="top-bar"
                className="bg-red-600 w-full min-h-16 text-white font-mono flex justify-between items-center"
            >
                <div id="logo" className="w-12 h-12 max-w-12 max-h-12 bg-[#FFF8E7] ml-2">
                    <button onClick={() => redirect("/")} type="button">
                        <img src="logo.png"/>
                    </button>
                </div>
                <div
                id="nav-bar"
                className="text-lg flex justify-end flex-row w-max max-h-12"
                >
                    <button onClick={() => redirect("leaderboard")} type="button" className="mx-2">
                        Top Santas
                    </button>
                    <p>|</p>
                    <button onClick={() => redirect("wishcards")} type="button" className="mx-2">
                        Wishcards
                    </button>
                    <p>|</p>
                    <button onClick={() => signOut(auth)} type="button" className="mx-2">
                        Log out
                    </button>
                </div>
            </div>
        <div id="hero-image" className="flex justify-center text-center hero-image">
            <img src="gift.jpeg" className="object-fill w-full opacity-0" />
            <div className="hero-text">
                <h3 className="text-4xl">Join Santa Co. Ltd. Today!</h3>
                <div className="flex justify-center items-stretch content-stretch mt-5">
                    <button className="border-2 border-white w-40 h-auto mx-20 py-5" onClick={() => redirect("wishcards")}>
                        Help someone
                    </button>
                    <button className="border-2 border-white w-40 h-auto mx-20 py-5" onClick={() => redirect("leaderboard")}>
                        Our top Santas
                    </button>
                </div>
            </div>
        </div>
            <div id="body">
                <div className="flex justify-around text-center w-full" /></div>
            <div id="shoe">
                <div className="flex flex-col w-full h-auto bg-[#8B0000] text-white justify-center text-center pb-10">
                    <div>
                        <h1 className="text-5xl font-mono">Contact Us</h1>
                        <p className="text-2xl font-mono">Email: gaben@valvesoftware.com</p>
                    </div>
                </div>
            </div>
        </div>
    </>)
    
    
}