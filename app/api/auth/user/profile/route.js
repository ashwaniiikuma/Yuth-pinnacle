import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// GET: User details fetch karne ke liye
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ success: false, message: "Phone number is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("yuth-pinnacle");
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      user: {
        name: user.name || "",
        mobile: user.phone || phone,
        email: user.email || "",
        gender: user.gender || "",
        dob: user.dob || "",
        altMobile: user.altMobile || "",
        hintName: user.hintName || ""
      }
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}

// PUT: User details update karne ke liye
export async function PUT(request) {
  try {
    const body = await request.json();
    const { phone, name, email, gender, dob, altMobile, hintName } = body;

    if (!email) {
      return NextResponse.json({ success: false, message: "Phone number is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("yuth-pinnacle");

    const updatedData = {
      name,
      email,
      gender,
      dob,
      altMobile,
      hintName,
      updatedAt: new Date()
    };

    const result = await db.collection("users").updateOne(
      { email },
      { $set: updatedData },
      { upsert: true } // Agar user pehle se nahi hai to naya create kar dega
    );

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully"
    }, { status: 200 });

  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}