import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        const client = await clientPromise;
        const db = client.db("youth-pinnacle");

        // Sort by _id descending taaki naye orders sabse upar aayein
        const orders = await db.collection("orders").find({}).sort({ _id: -1 }).toArray();
        
        let totalGrossRevenue = 0;
        let totalEstimateProfit = 0;
        let categoryStats = {}; // <--- Yeh object categories ko count karega

        orders.forEach((order)=>{
            let itemPrice = Number(order.price || order.amount || order.totalAmount || order.total || 0);
            let itemQty = Number(order.qty || order.quantity || 1);
            let itemTotal = itemPrice * itemQty;

            totalGrossRevenue += itemTotal;

            const margin = order.profitMargin || 0.35;
            totalEstimateProfit += itemTotal * margin;

            // --- CATEGORY DISTRIBUTION LOGIC ---
            if (order.cartItems && Array.isArray(order.cartItems)) {
                order.cartItems.forEach(cartItem => {
                    // Agar cartItem mein category na ho toh order ki category ya default "UNISEX/GENERAL" le lein
                    const cat = (cartItem.category || order.category || "General").toUpperCase();
                    const qty = Number(cartItem.quantity || cartItem.qty || 1);
                    categoryStats[cat] = (categoryStats[cat] || 0) + qty;
                });
            } else {
                const cat = (order.category || "General").toUpperCase();
                categoryStats[cat] = (categoryStats[cat] || 0) + itemQty;
            }
        });
        const pendingRequests = await db.collection("orders").find({
            status: {$in: ["Exchange Requested", "Return Requested"]}
        }).toArray();

        return NextResponse.json({
            success: true,
            totalOrders: orders.length,
            totalGrossRevenue,
            totalEstimatedProfit: Math.round(totalEstimateProfit),
            categoryStats, // <--- Yeh naya data frontend ke liye bhej rahe hain
            pendingRequestsCount: pendingRequests.length,
            pendingRequestsList: pendingRequests,
            categoryStats,
            orders
        }, {status: 200});

    }catch (error){
        console.log("Error fetching admin stats:", error);
        return NextResponse.json(
            {success: false, message: "Internal Server Error"},{status: 500}
        );
    }
}