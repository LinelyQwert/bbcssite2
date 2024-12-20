// "use server";

// import { getFirebaseAdmin } from "@/app/actions/firebase";
// import { cookies } from "next/headers";

// export async function checkAuth() {
//     const { adminFirestore, adminAuth } = await getFirebaseAdmin();
//     const cookieStore = await cookies();
//     const authList = process.env.CARD_AUTH?.split(',')
    
//     const token = cookieStore.get("token")?.value;
//     if (token) {
//         try {
//             const decodedToken = await adminAuth.verifyIdToken(token);
//             if (authList?.length && authList?.includes(decodedToken?.email)) {
//                 return "OK";
//             }
//         } catch (e) {
//             console.error(e);
//             return false;
//         }
//     }
//     return false;
// }