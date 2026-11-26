import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

// GET: Fetch orders for a user based on email
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    console.log("Searching order for email:", email);

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
    }

    const client = await clientPromise;
            const db = client.db("youth-pinnacle");

    const orders = await db.collection("orders").find({ 
      email: { $regex: new RegExp(`^${email}$`, "i") } 
    }).toArray();

    console.log("Found orders count:", orders.length);

    return NextResponse.json({ 
      success: true, 
      orders: orders || [] ,
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}

// POST: Create/Place a new order and save it to database
export async function POST(request) {
  try {
    const body = await request.json();
    const { email, title, size, qty, price, image, address } = body;

    if (!email || !title || !price) {
      return NextResponse.json({ success: false, message: "Required order details are missing" }, { status: 400 });
    }

    const client = await clientPromise;
            const db = client.db("youth-pinnacle");

    // Generate a random unique order ID like YP-849201
    const randomId = Math.floor(100000 + Math.random() * 900000);
    const orderId = `YP-${randomId}`;

    // Format current date nicely e.g., "7th Sep 2026"
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const currentDate = new Date().toLocaleDateString('en-GB', options);

    const formattedCartItems = cartItems && cartItems.length > 0
    ? cartItems.map(item =>({
      name: item.name || title,
      price: item.price || price,
      quantity: item.quantity || qty || 1,
      Category: item.Category || Category || "General",
      size: item.size || size || "M"

    }))
    :[{
        name: title,
        price: price,
        quantity: qty ||1,
        image: image || "",
        Category: category || "General",
        size: size ||"M"
    }]
    const finalAmount = amount || (price * (qty || 1));

    const newOrder = {
      orderId,
      id: orderId,
      email: email,
      title: title || (formattedCartItems[0] ? formattedCartItems[0].name : "Product"),
      price: finalAmount,
      amount: finalAmount,
      qty: qty || 1,
      image: image || (formattedCartItems[0] ? formattedCartItems[0].image : ""),
      category: category || formattedCartItems[0].category || "General", // Top-level category for stats
      cartItems: formattedCartItems, // 👈 Yeh admin dashboard live stream aur category breakdown ke liye zaroori hai
      address: address || {},
      status: "pending", // Shuruat mein status 'pending' rahega
      date: currentDate,
      deliveryDate: "Expected in 3-5 days",
      createdAt: new Date()
    };

    // Insert order into 'orders' collection
    await db.collection("orders").insertOne(newOrder);

    return NextResponse.json({ 
      success: true, 
      message: "Order placed successfully",
      orderId 
    }, { status: 200 });

  } catch (error) {
    console.error("Error saving order:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}