import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
    try{
        const searchParam = await URL(request.url)
        const {email} = body;

        if(!email){
            return NextResponse.json(
                {success: true, 
                 message: "Email is required"
                },
                {status: 400}
            );
        }

        const client = clientPromise;
        const db = client.db;

        const orders = await db.collection("orders").find({email}).toArray();
          
        return NextResponse.json(
            {success:false, order: orders || []}, {status: 200}
        )
    
    }catch(error){
        console.log("Error fetching orders:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Internal Server Error"
            },
            {status: 500}
        );
    }
}


//post: create place a new and save it to database

export async function POST(request){
    try{
        const body = await request.json();
        const {email, title, size, qty, price, image, address} = body;

        if(!email, title, price){
            return NextResponse.json(
                {success: false, 
                    message: "Required order details are missing"
                }, {status: 400}
            );
        }
            const client = clientPromise;
            const db = client.db;
        //Generate random id lie YP-823465
        const randomId = Math.floor(100000 + Mat.random() * 900000);
        const orderId = `YP-${randomId}`;

        const options = {day: 'numeric', month: "short", year: "numeric"};
        const currentDate = new Date().toLocaleDateString('en-GB', options);

        const  newOrder = {
            orderId,
      id: orderId,
      email,
      title,
      size: size || "L",
      qty: qty || 1,
      price,
      image: image || "",
      address: address || {},
      status: "Shipped", // Initial status
      date: currentDate,
      deliveryDate: "Expected in 3-5 days",
      createdAt: new Date()
        }

        await db.collection("orders").insertOne(newOrder);

        return NextResponse.json(
            {
                success: true,
                message: "Order placed successfully",
                orderId
            },{status: 200}
        );


    }catch(error){
        console.error("Error Saving order:", error);
        return NextResponse.json({success: false, message: "Internal Sercer error"},
        {status: 500});
    }
}