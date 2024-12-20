"use server";

import { getFirebaseAdmin } from "@/app/actions/firebase";
import { FieldValue } from "firebase-admin/firestore";
import { cookies } from "next/headers";

export async function deleteCard(id: string) {
    const { adminFirestore, adminAuth } = await getFirebaseAdmin();
    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;
    if (token) {
        try {
            const decodedToken = await adminAuth.verifyIdToken(token);
            if (decodedToken?.email) {
                const docRef = adminFirestore.collection("cards").doc("card");
                const docRef2 = adminFirestore.collection("users").doc(decodedToken.email);
                const doc = await docRef2.get()
                if (!doc.exists){
                    const username = decodedToken.email.split("@")[0];
                    await adminFirestore.collection("users").doc(decodedToken.email).set({"givenGifts":1, "name":username})
                } else{
                    docRef2.update({
                        "givenGifts": doc.data()?.givenGifts + 1
                    })
                }
                await docRef.update({
                    [id]: FieldValue.delete(),
                });
                return 'OK';
            }
        } catch (e) {
            console.error(e);
            return {status: 401};
        }
    }
    return {status: 403};
}