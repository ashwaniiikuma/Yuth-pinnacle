import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(params) {
    try{
        const {searchParam} = new URL(request.url);
        const email = searchParam.get("email")

        if(!email){
           return NextResponse.json({
            success:false,
            message:"Email is required"
           }, {status: 400});
        }

        const client = clientPromise;
        const db = client.db;

        const user = await db.collection("users").findOne({email});

        if(!user){
            return NextResponse.json(
                {success: false,
                message: "user not found"
                },
                {success:404}
            );
        }

        return NextResponse.json(
            {success: true,
             addresses:user.addresses || []
            }, {status: 200}
        )
    }catch(error){
        console.error("Error fetching addresses: ", error);
        return NextResponse.json(
            {success: false,
                message: " Internal Server Error"
            }, {status: 500}
        );
    }
}

//post Add a new address to the user's profile useing email
    export async function post(params) {
        try{
            const body = await request.json();
            const {email, address} = body;

            if(!email || !address){
                return NextResponse.json(
                    {success: false,
                        message: "Email or address is required"
                    },
                    {status: 400}
                )}

                const client = clientPromise;
                const db = client.db();

            //push the new address into a 'addresses'
            const result = await db.collection("users").updateOne(
                {email},
                {$push: {addresses:{id: Date.new().toString(), ...address}}},
                {upsert: true}
            );

            return NextResponse.json(
                {success: true,
                    message: "Address added successfully"
                },
                {status: 200}
            );
        }catch(error){
            return NextResponse.json(
                {status: false,
                    message: "Internal server Error"
                },
                {status: 500}
            );
        }
    }