import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Razorpay from 'razorpay';

export async function POST(request) {
    try {
        const body = await request.json();
        // 👈 Yahan 'email' ko bhi destructure karein
        const { amount, currency, cartItems, shippingAddress, paymentType, email } = body;
    
        let orderId = "COD_" + Date.now();
        let finalAmount = amount;

        if (paymentType === "online"){
            const razorpay = new Razorpay({
                key_id: process.env.RAZORPAY_KEY_ID,
                key_secret: process.env.RAZORPAY_SECRET_KEY,
            });

            const options = {
                amount: amount * 100,
                currency: currency || "INR",
                receipt: "receipt_" + Date.now(),
            };

            const order = await razorpay.orders.create(options);
            orderId = order.id;
            finalAmount = order.amount;
        }

        const client = await clientPromise;
        const db = client.db("youth-pinnacle");

        const orderData = {
            orderId: orderId,
            email: email || "", 
            amount: amount,
            currency: currency || "INR",
            paymentType: paymentType,
            cartItems: cartItems || [],
            shippingAddress: shippingAddress || {},
            status: "pending",
            createdAt: new Date(),
        };

            console.log("Saving order for email in backend:", email); // 👈 Yeh line add karein
await db.collection("orders").insertOne(orderData);
        return NextResponse.json(
            {
                success: true,
                orderId: orderId,
                amount: finalAmount,
                currency: currency || "INR",
            }, 
            { status: 200 }
        );
    } catch (error) {
        console.error("Payment API Error:", error);
        return NextResponse.json(
            {
                success: false,
                error: error.message,
            }, 
            { status: 500 }
        );
    }
}