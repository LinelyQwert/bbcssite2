'use client'
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";

export default function Page() {
    const [loading, setLoading] = useState(true);
    const provider = new GoogleAuthProvider();
    const router = useRouter();
    useEffect(() => {
        const authCheck = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                router.push("/");
            } else {
                setLoading(false);
            }
        });    
        return () => authCheck();
    }, [router]);

    function redirect(path : string){
        router.push("/" + path)
    }

    function signIn() {
		signInWithPopup(auth, provider)
        .then(async (result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            if (credential) {
                const user = result.user;
                const idToken = await user.getIdToken(true);
                document.cookie = `token=${idToken}`;
                alert(user.email)
            }
        }).catch((error) => {
            alert(error)
		});
    }
    function signInPage() {
        return ( 
             <>
                <button onClick={() => redirect("")} className="bg-red-600 w-full font-mono">Back</button>
                <div
                 id="container"
                 className="relative flex min-h-screen flex-col justify-center overflow-hidden py-6 bg-gradient-to-tl to-red-200 from-green-100"
                 >
                <div className="relative bg-gray-50 shadow-2xl ring-1 ring-gray-900/5 max-w-2xl mx-auto rounded-lg w-full">
                    <div className="bg-white overflow-hidden relative">
                        <div className="flex flex-row items-stretch justify-end overflow-hidden">
                            <section className="bg-white">
                                <img src="/gift.jpg" className="object-cover h-full opacity-50"></img>
                            </section>
                            <section className="bg-white min-w-[66%]">
                                <img className="h-auto w-full object-cover rounded-lg" src="/banner.png" />
                                <div className="mx-auto max-w-xl px-6 pb-8">
                                    <div className="font-mono flex justify-center bg-[#4285f4] rounded-lg text-white border-[#4285f4] border-2">
                                        <img src='/google.png' className="w-1/6"/>
                                        <button className="bg-[#4285f4] font-medium text-2xl mb-3 pt-2" onClick={signIn}>Sign in with Google</button>
                                        <br />
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                 </div>
                 </div>
     
             </>
         )
     }
    if (loading) {
        return <p>Loading...</p>;
    } else {
        return signInPage()
    }
}
//<button onClick={signIn}>Sign in</button>