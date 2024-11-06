import {NextResponse} from "next/server";

export async function GET(req: Request) {
    const res = await fetch("https://exunbackend.onrender.com/getLocations", {method: "GET", credentials: "include"});
    if (!res){
        NextResponse.json({error: "Failed to fetch locations"});
    }
    console.log(res);
}