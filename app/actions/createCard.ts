"use server";

import { getFirebaseAdmin } from "@/app/actions/firebase";
import { cookies } from "next/headers";

export async function createCard(money: number, msg: string, item:string) {
    const { adminFirestore, adminAuth } = await getFirebaseAdmin();
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (token) {
        try {
            const decodedToken = await adminAuth.verifyIdToken(token);
            if (decodedToken?.email) {
                const docRef = adminFirestore.collection("cards").doc("card");
                await docRef.update({
                    [Math.random().toString(36).slice(2, 4)]: {
                        author: decodedToken.email,
                        cost: money,
                        message: msg,
                        wishitem: item,
                    }
                });
                return 'OK';
            }
        } catch (e) {
            console.error(e);
            return e;
        }
    }
    return {status: 403};
}