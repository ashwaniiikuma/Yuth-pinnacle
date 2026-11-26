import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

// GET: Fetch addresses for a user based on email
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("youth-pinnacle");

    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      addresses: user.addresses || [] 
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching addresses:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}

// POST: Add a new address to the user's profile using email
export async function POST(request) {
  try {
    const body = await request.json();
    const { email, address } = body;

    if (!email || !address) {
      return NextResponse.json({ success: false, message: "Email and address details are required" }, { status: 400 });
    }

    const client = await clientPromise;
        const db = client.db("youth-pinnacle");


    // Push the new address into an 'addresses' array for the user matched by email
    const result = await db.collection("users").updateOne(
      { email },
      { $push: { addresses: { id: Date.now().toString(), ...address } } },
      { upsert: true }
    );

    return NextResponse.json({ 
      success: true, 
      message: "Address added successfully" 
    }, { status: 200 });

  } catch (error) {
    console.error("Error saving address:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request){
  try{
    const {searchParams} = new URL(request.url);
    const email = searchParams.get("email");
    const addressId = searchParams.get("addressId")

    if(!email || !addressId){
      return NextResponse.json({
        success:false, message:"Email or addressId is required", status:400
      });
    }

    const client = await clientPromise;
      const db = client.db("youth-pinnacle")

      const result = await db.collection("users").updateOne(
        {email},
        {$pull: {addresses: {id:addressId}}}
      )

      if(result.modifiedCount === 0){
        return NextResponse.json({success: false, message: "Address not Found or already deleted"}, {status: 404});
      }

      return NextResponse.json(
        {sucess:true, messsage: "Address deleted Successfully"},{status:200}
      );

  }catch (error){
    console.error("Error deleting address: ", error);
    return NextResponse.json({
      success:false, message: "Internal Server error"
    }, {status: 500})
  }
}