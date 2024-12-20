'use client'

import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/app/firebase";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import { DocumentData } from "firebase-admin/firestore";
import { checkAuth } from "../actions/checkCardAuth";
import { truncate } from "fs";
import { createCard } from "../actions/createCard";
import { fetchCard } from "../actions/fetchCard";
import { deleteCard } from "../actions/deleteCard";


export default function Page(){
    const [docData, setDocData] = useState<DocumentData | null>(null);
    const [editValues, setEditValues] = useState<Record<string, string>>({});
    const router = useRouter();

    async function clientCreateCard(){
        const item = prompt("Please enter your wish item", "Rice (1KG)") // qn, default text
        const money = (prompt("Please enter the cost ($)", "4.05")) // qn, default text
        const msg = prompt("Please enter your message", "thajks") // qn, default text
        if (item == null || item == "" || money == null || money == "" || msg == null || msg == "") {
            alert("cancel")
        } else {
            const cost = parseFloat(money)
            await createCard(cost, msg, item).then(r => alert(r));
            clientFetchCard()
        }
    }

    async function clientDeleteCard() {
        const res = prompt("What is the ID of the card u wish to delete?")
        if (res == "" || res == null){            
            alert("Cancelled")
        } else {
            await deleteCard(res).then((r) => alert(r))
            clientFetchCard();
        }   
    }

    function clientFetchCard(){
        fetchCard().then(r => {
            if (!r) {
                return;
            }
            if (r.status === 401) {
                signOut(auth);
            }
            setDocData(r)
            const initialEditValues = Object.entries(r).reduce<Record<string, string>>((acc, [id, field]) => {
                acc[id] = field.name;
                return acc;
            }, {});
            setEditValues(initialEditValues);
        })
    }

    function redirect(path : string){
        router.push("/" + path)
    }

    useEffect(() => {
        const authCheck = onAuthStateChanged(auth, (currentUser) =>{
            if(!currentUser){
                router.push("/login")
            }
        })

        clientFetchCard()

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
                    <button onClick={() => redirect("about")} type="button" className="mx-2">
                        About
                    </button>
                    <p>|</p>
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
            <div id="body" className="mx-4 my-4 font-mono">
                <div>
                    <button className="text-white bg-red-600 mb-2 w-40 h-10 rounded-2xl" onClick={() => clientCreateCard()}>Create Card</button>
                </div>
                <div>
                    <button className="text-white bg-red-600 mb-2 w-40 h-10 rounded-2xl" onClick={() => clientDeleteCard()}>Delete Card</button>
                </div>

                <div
                id="content"
                className="flex justify-evenly mx-8 flex-row flex-wrap max-w-full h-max"
                >
                        {docData ? (Object.entries(docData).map(([id, field]) => (
                            <div className="mb-5 w-[30%] max-w-[30%] ar text-black flex justify-center text-center">
                                <div className="card">
                                    <div id={id} className="card__inner" onClick={(e) => {e.currentTarget.classList.toggle("is-flipped"); id=e.target.id}}>
                                        <div className="card__face card__face--front">
                                            <img src="card.png" className="object-cover h-auto" />
                                        </div>
                                        <div className="card__face card__face--back">
                                            <div className="card__content bg-slate-100">
                                                <div className="card__header">
                                                    <h2>{field.wishitem} : ID -&gt; {id}</h2>
                                                </div>
                                                <div className="card__body px-[30px]">
                                                    <h3>{field.cost}</h3>
                                                    <h3>Message: {field.message}</h3>
                                                    <h3>to {field.author}</h3>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))) : (
                            <p className="text-black">Loading...</p>
                        )}
                        {/* <button type="button" className="hover:border-black border-2">
                        <img src="card.png" className="object-cover h-auto" />
                        </button> */}
                </div>
            </div>
        </div>

    </>)
    
    
}