import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req){
    try{
        const body = await req.json();
        const{orderId, actionType, reason, comment, newSize, userEmail, } = body;


        if(!orderId || !actionType || !reason){
            return NextResponse.json(
                {success:false, message: "Missing required field."},
                {status:400}
            );
        }

        const client = await clientPromise;
        const db = client.db("youth-pinnacle");

        const{ObjectId} = require("mongodb");
        let queryFilter = {orderId: orderId};

        try{
            if(ObjectId.isValid(orderId)){
                queryFilter = {$or: [{orderId: orderId}, {_id: new ObjectId(orderId) }]};
            }
        }catch(e){

        }
        const updateResult = await db.collection("orders").updateOne(
            queryFilter,
            {
                $set: {
                    status: `${actionType} Requested`,
                    returnExchangeDetails: {
                        type: actionType,
                        reason: reason,
                        newSize: newSize || null,
                        comment: comment || "",
                        requestAt: new Date(),
                        userEmail:userEmail || ""
                    }
                }
            }
        );

        if(updateResult.matchedCount === 0){
            return NextResponse.json(
                {success: false, message: "Order not found in database."},
                {status: 404}
            );
        }
        return NextResponse.json({
            success: true,
            message: `${actionType} request has been successfully submitted!`,
        });

    }catch (error){
        console.error("Database Error during Return/Exchange:", error);
        return NextResponse.json(
            {success: false, message: "Internal server error."},
            {status: 500}
        );
    }
}