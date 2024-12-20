"use client"

import {useRouter} from "next/navigation";

export async function redirect(path : string){
    const router = useRouter();
    router.push("/" + path)
    return "OK"
}