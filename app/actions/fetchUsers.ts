"use server";

import { getFirebaseAdmin } from "@/app/actions/firebase";
import { cookies } from "next/headers";

export async function fetchUsers(){
    const { adminFirestore, adminAuth } = await getFirebaseAdmin();
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (token){
        try {
            const decodedToken = await adminAuth.verifyIdToken(token)
            if (decodedToken?.email) {
                // const collectionRef = adminFirestore.collection("users")

                // return collectionRef.listDocuments().then(documentRefs => {
                //     return adminFirestore.getAll(...documentRefs)
                // })
                


                const colRef = await adminFirestore.collection("users").listDocuments();
                const snapshots = await adminFirestore.getAll(...colRef)
                var dat = []
                for (let snapshot of snapshots){
                    if (snapshot.exists){
                        dat.push(await snapshot.data()) 
                    }
                }
                return dat
            }
        } catch(e) {
            console.error(e)
            return {status: 401}
        }
    }
    return {status: 403}
}