import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

// GET: Cart items fetch karne ke liye
export async function GET(request) {
    try {
        const client = await clientPromise;
        const db = client.db("youth-pinnacle");

        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');
        
        if (!userId) {
            return NextResponse.json({ success: false, error: "User ID is required" }, { status: 400 });
        }

        const cartDoc = await db.collection("carts").findOne({ userId });

        if (!cartDoc || !cartDoc.items || cartDoc.items.length === 0) {
            return NextResponse.json({ success: true, cart: { items: [] } });
        }

        const populatedItems = await Promise.all(
            cartDoc.items.map(async (item) => {
                let product = null;
                try {
                    // 1. Pehle MongoDB mein _id ya id se dhoondhein
                    if (ObjectId.isValid(item.productId)) {
                        product = await db.collection("products").findOne({ _id: new ObjectId(item.productId) });
                    }
                    if (!product) {
                        product = await db.collection("products").findOne({ id: item.productId }) || 
                                  await db.collection("products").findOne({ id: Number(item.productId) });
                    }
                } catch (error) {
                    console.log("DB fetch error:", err);
                }

             
           // app/api/cart/route.js ke GET method ke andar populatedItems map ke return object ko aise update karein:

                return {
    productId: item.productId,
    quantity: item.quantity,
    size: item.size,
    name: product?.title || product?.name || "Product Name",
    price: product?.price || 0,
    originalPrice: product?.originalPrice || (product?.price ? product.price * 2 : 0),
    discount: product?.discount || "50% OFF",
    rating: product?.rating || "4.5",
    brand: product?.brand || "Brand",
    image: product?.image || product?.images?.[0] || "/placeholder.png"
};
            })
        );

        return NextResponse.json({
            success: true,
            cart: { items: populatedItems }
        });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// POST: Cart mein product add karne ke liye
export async function POST(request) {
    try {
        const client = await clientPromise;
        const db = client.db("youth-pinnacle");

        const { userId, productId, quantity, size } = await request.json();

        if (!userId || !productId || !size) {
            return NextResponse.json({ success: false, error: 'All fields are required' }, { status: 400 });
        }

        const cartsCollection = db.collection("carts");

        let cart = await cartsCollection.findOne({ userId: userId });

        if (!cart) {
            const newCart = {
                userId,
                items: [{ productId: productId, quantity: quantity || 1, size }],
                createdAt: new Date(),
                updatedAt: new Date()
            };
            await cartsCollection.insertOne(newCart);
            return NextResponse.json({ success: true, message: "Cart created successfully", cart: newCart });
        } else {
            const itemIndex = cart.items.findIndex(
                (item) => item.productId.toString() === productId.toString() && item.size === size
            );

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += (quantity || 1);
            } else {
                cart.items.push({ productId: productId, quantity: quantity || 1, size });
            }

            await cartsCollection.updateOne(
                { userId: userId },
                { $set: { items: cart.items, updatedAt: new Date() } }
            );

            return NextResponse.json({ success: true, message: 'Cart updated successfully', cart });
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

//DELETE: Cart remove spacific items
export async function DELETE(request) {
    try{
        const client = await clientPromise;
        const db = client.db("youth-pinnacle");


        const {searchParams} = new URL(request.url); 
        const userId = searchParams.get("userId");

        const productId = searchParams.get("productId");
        const size = searchParams.get('size');

        if(!userId){
            return NextResponse.json({ success: false, error: "UserId is required" }, { status: 400 });
        }

        const cartsCollection = db.collection("carts");
        if(!productId){
            await cartsCollection.deleteOne({userId})
            return NextResponse.json(
                {success:false, error: "Cart cleared successfully"},
            );
        }
        const cart = await cartsCollection.findOne({userId});

        if(!cart){
            return NextResponse.json(
                {
                    success:false, error: "Cart not found"
                },
                {status:404});
        }

        const updatedItems = cart.items.filter(
            (item)=> !(item.productId.toString() === productId.toString() && item.size === size)
        );

        await cartsCollection.updateOne(
            {userId},
            {$set: {items: updatedItems, updatedAt: new Date()}}
        );

        return NextResponse.json(
            {success:true, message: "Item removevd successfully",
            cart: {items: updatedItems}});

    }catch (error){
        return NextResponse.json({
            success:false, error: error.message
        }, {status:500});
    }
}