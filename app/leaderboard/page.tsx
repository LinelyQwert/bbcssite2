'use client'

import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/app/firebase";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import { DocumentData } from "firebase-admin/firestore";
import { fetchUsers } from "../actions/fetchUsers";

export default function Page(){
    const router = useRouter();
    const [users, setUsers] = useState<(DocumentData | undefined)[] | { status: number; }>()

    function redirect(path : string){
        router.push("/" + path)
    }

    function clientFetchUsers(){
        fetchUsers().then(r => {
            if (!r) {
                return;
            }
            try {
                if ('status' in r) {
                    if (r.status === 401) {
                        signOut(auth);
                        return
                    }
                }
            } catch(e) {
                console.log(e)
            }
            setUsers(r)
            if(!('status' in r)){
                for (const data of r){
                    console.log(`Retrieved data: ${JSON.stringify(data)}`)
                }
            }
        })
    }

    function clientParseUsers(data : (DocumentData | undefined)[]){
        const res = []
        if (true) {
            data = data.filter(user => user !== undefined).sort((a, b) => (
                a.givenGifts > b.givenGifts ? -1 : b.age > a.age ? 1 : 0
            ))
        }
        
        for (const user of data){
            if (user !== undefined){
                res.push(
                    <li>
                        <div className="flex justify-evenly flex-col border-black border-2 text-center items-center">
                            <h1 className="text-3xl">{user["name"]}</h1>
                            <p> {user["givenGifts"]} Gifts Given</p>
                        </div>
                    </li>
                )
            }
        }
        return res
    }

    useEffect(() => {
        const authCheck = onAuthStateChanged(auth, (currentUser) =>{
            if(!currentUser){
                router.push("/login")
            }
        })
        clientFetchUsers()
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
            <div
                id="body"
                className="relative font-mono flex justify-start align-text-top items-center flex-col border-red-600 border-2"
            >
                <h3 className="text-5xl underline text-black">Top Santas - Most gifts given</h3>
                <br />
                <sub className="text-lg text-black">
                dont worry, anyone who gave at least 1 gift is on the nice list. Thanks
                for helping our community :)
                </sub>
                <img src="scroll.png" className="min-w-[66%]" />
                <div className="hero-text min-w-[40%] rot-y max-h-[55%] overflow-scroll nobar">
                    <ul className=" border-black border-2  min-h-[100%] relative mt-0">

                        {(users == undefined || 'status' in users) ? (                            
                            <p className="text-black">Loading...</p>
                            ) : (
                            clientParseUsers(users)
                        )}

                        <li>
                            <div className="flex justify-evenly flex-col border-black border-2 text-center items-center">
                                <h1 className="text-3xl">MakeAWish Foundation</h1>
                                <p> 0 Gifts Given</p>
                            </div>
                        </li>
                        <li>
                            <div className="flex justify-evenly flex-col border-black border-2 text-center items-center">
                                <h1 className="text-3xl">MakeAWish Foundation</h1>
                                <p> 0 Gifts Given</p>
                            </div>
                        </li>
                        <li>
                            <div className="flex justify-evenly flex-col border-black border-2 text-center items-center">
                                <h1 className="text-3xl">MakeAWish Foundation</h1>
                                <p> 0 Gifts Given</p>
                            </div>
                        </li>
                        <li>
                            <div className="flex justify-evenly flex-col border-black border-2 text-center items-center">
                                <h1 className="text-3xl">MakeAWish Foundation</h1>
                                <p> 0 Gifts Given</p>
                            </div>
                        </li>
                        <li>
                            <div className="flex justify-evenly flex-col border-black border-2 text-center items-center">
                                <h1 className="text-3xl">MakeAWish Foundation</h1>
                                <p> 0 Gifts Given</p>
                            </div>
                        </li>
                        <li>
                            <div className="flex justify-evenly flex-col border-black border-2 text-center items-center">
                                <h1 className="text-3xl">MakeAWish Foundation</h1>
                                <p> 0 Gifts Given</p>
                            </div>
                        </li>
                        <li>
                            <div className="flex justify-evenly flex-col border-black border-2 text-center items-center">
                                <h1 className="text-3xl">MakeAWish Foundation</h1>
                                <p> 0 Gifts Given</p>
                            </div>
                        </li>
                        <li>
                            <div className="flex justify-evenly flex-col border-black border-2 text-center items-center">
                                <h1 className="text-3xl">MakeAWish Foundation</h1>
                                <p> 0 Gifts Given</p>
                            </div>
                        </li>
                        <li>
                            <div className="flex justify-evenly flex-col border-black border-2 text-center items-center">
                                <h1 className="text-3xl">MakeAWish Foundation</h1>
                                <p> 0 Gifts Given</p>
                            </div>
                        </li>
                        <li>
                            <div className="flex justify-evenly flex-col border-black border-2 text-center items-center">
                                <h1 className="text-3xl">MakeAWish Foundation</h1>
                                <p> 0 Gifts Given</p>
                            </div>
                        </li>
                        <li>
                            <div className="flex justify-evenly flex-col border-black border-2 text-center items-center">
                                <h1 className="text-3xl">MakeAWish Foundation</h1>
                                <p> 0 Gifts Given</p>
                            </div>
                        </li>
                        <li>
                            <div className="flex justify-evenly flex-col border-black border-2 text-center items-center">
                                <h1 className="text-3xl">MakeAWish Foundation</h1>
                                <p> 0 Gifts Given</p>
                            </div>
                        </li>
                        <li>
                            <div className="flex justify-evenly flex-col border-black border-2 text-center items-center">
                                <h1 className="text-3xl">MakeAWish Foundation</h1>
                                <p> 0 Gifts Given</p>
                            </div>
                        </li>
                        <li>
                            <div className="flex justify-evenly flex-col border-black border-2 text-center items-center">
                                <h1 className="text-3xl">MakeAWish Foundation</h1>
                                <p> 0 Gifts Given</p>
                            </div>
                        </li>
                        <li>
                            <div className="flex justify-evenly flex-col border-black border-2 text-center items-center">
                                <h1 className="text-3xl">MakeAWish Foundation</h1>
                                <p> 0 Gifts Given</p>
                            </div>
                        </li>
                        <li>
                            <div className="flex justify-evenly flex-col border-black border-2 text-center items-center">
                                <h1 className="text-3xl">MakeAWish Foundation</h1>
                                <p> 0 Gifts Given</p>
                            </div>
                        </li>
                        <li>
                            <div className="flex justify-evenly flex-col border-black border-2 text-center items-center">
                                <h1 className="text-3xl">MakeAWish Foundation</h1>
                                <p> 0 Gifts Given</p>
                            </div>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    </>)
    
    
}