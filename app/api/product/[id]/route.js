import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        const resolvedParams = await params;
        const id = resolvedParams.id;

        let product = null;

        // Pehle MongoDB se try karenge
        try {
            const client = await clientPromise;
            const db = client.db("youth-pinnacle");

            if (ObjectId.isValid(id)) {
                product = await db.collection("products").findOne({ _id: new ObjectId(id) });
            }

            if (!product) {
                product = await db.collection("products").findOne({ id: id }) || 
                          await db.collection("products").findOne({ id: Number(id) });
            }
        } catch (dbError) {
            console.log("Database connection skipped/failed, falling back to local data");
        }

        // AGAR MONGODB MEIN NAHI MILA, TOH LOCAL `productsData` SE DHOOND LIYA JAYEGA!
        if (!product) {
            product = productsData.find((item) => item.id.toString() === id?.toString());
        }

        if (!product) {
            return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
        }

        // Agar product MongoDB ka hai toh _id string hogi, local wale ka id alag ho sakta hai
        const formattedProduct = {
            ...product,
            _id: product._id ? product._id.toString() : product.id,
        };

        return NextResponse.json({ success: true, product: formattedProduct }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}