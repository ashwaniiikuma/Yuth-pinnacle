import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const client = await clientPromise;
        const db = client.db("youth-pinnacle");

        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({
                success: false, 
                error: "userId is required"
            }, { status: 400 });
        }

        const wishlistCollection = db.collection("wishlists");
        const wishlist = await wishlistCollection.findOne({ userId });

        return NextResponse.json({
            success: true,
            wishlist: wishlist || { items: [] }
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message }, { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const client = await clientPromise;
        const db = client.db("youth-pinnacle");

        const body = await request.json();
        const { userId, product } = body;

        const prodId = product?.id || product?._id;

        if (!userId || !product || !prodId) {
            return NextResponse.json({ success: false, error: "UserId and Product details are required" }, { status: 400 });
        }

        const wishlistsCollection = db.collection("wishlists");
        const existingWishlist = await wishlistsCollection.findOne({ userId });

        let updatedItems = [];

        if (existingWishlist) {
            const currentItems = existingWishlist.items || [];
          
            const itemExists = currentItems.some(item => {
                const existingId = item?.id || item?._id;
                return existingId && prodId && existingId.toString() === prodId.toString();
            });

            if (itemExists) {
                return NextResponse.json({ success: true, message: "Product already in wishlist", wishlist: existingWishlist });
            }

            updatedItems = [...currentItems, product];
            await wishlistsCollection.updateOne(
                { userId },
                { $set: { items: updatedItems, updatedAt: new Date() } }
            );
        } else {
            updatedItems = [product];
            await wishlistsCollection.insertOne({
                userId,
                items: updatedItems,
                createdAt: new Date(),
                updatedAt: new Date()
            });
        }

        return NextResponse.json({
            success: true,
            message: "Added to wishlist successfully",
            wishlist: { items: updatedItems }
        });

    } catch (error) {
        console.error("Wishlist POST Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// DELETE: Remove item from wishlist
export async function DELETE(request) {
    try {
        const client = await clientPromise;
        const db = client.db("youth-pinnacle");

        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");
        const productId = searchParams.get("productId");

        if (!userId || !productId) {
            return NextResponse.json(
                { success: false, error: "userId and productId are required" }, { status: 400 });
        }

        const wishlistsCollection = db.collection("wishlists");
        const wishlist = await wishlistsCollection.findOne({ userId });

        if (!wishlist) {
            return NextResponse.json(
                { success: false, error: "Wishlist not found" }, { status: 404 }
            );
        }
        
        // Safe filter supporting both id, _id, and handling missing properties safely
        const updatedItems = (wishlist.items || []).filter(item => {
            if (!item) return false;
            const itemId = item.id || item._id;
            return itemId && itemId.toString() !== productId.toString();
        });

        await wishlistsCollection.updateOne(
            { userId },
            { $set: { items: updatedItems, updatedAt: new Date() } }
        );

        return NextResponse.json({
            success: true,
            message: "Removed from wishlist successfully",
            wishlist: { items: updatedItems }
        });

    } catch (error) {
        console.error("Wishlist DELETE Error:", error);
        return NextResponse.json(
            { success: false, error: error.message }, { status: 500 }
        );
    }
}