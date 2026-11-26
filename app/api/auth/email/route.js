
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("youth-pinnacle");

    let user = await db.collection("users").findOne({ email });

    if(!user){
        const defaultName = email.split('@')[0];
        const newUser = {
            email,
            name: defaultName,
            role:"customer",
            createdAt: new Date(),
            updatedAt: new Date()
         };
         await db.collection("users").insertOne(newUser);
         user = newUser;

        
    }
    return NextResponse.json({ success: true, message: "Logged in successfully",
        email:user.email,
        name: user.name || email.split('@')[0],
        role: user.role|| "customer"
     }, { status:0 || 200 });

  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}