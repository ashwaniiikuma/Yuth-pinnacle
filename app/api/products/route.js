import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(request) {
    try {
        const client = await clientPromise;
        const db = client.db("youth-pinnacle");

        const { searchParams } = new URL(request.url);
        const category = searchParams.get("category");
        const subcategory = searchParams.get("subcategory");

        console.log("COMING CATEGORY:", category);
        console.log("COMING SUBCATEGORY:", subcategory);

        let filter = {};

        // 1. Category filter (Exact or case-insensitive match)
        if (category) {
            filter.category = new RegExp(`^${category}$`, "i"); //regexp  = regular expression
        }

        // Pehle category ke base par products nikal lete hain taaki base data hamesha mile
        let products = await db.collection("products").find(filter).sort({ createdAt: -1 }).toArray();

        // 2. Agar subcategory di gayi hai, toh fetched products ko JS level par ya smart regex se filter karenge
        if (subcategory && products.length > 0) {
            const cleanSub = subcategory.replace(/-/g, " ").toLowerCase();
            const keywords = cleanSub.split(" ").filter(Boolean);

            // Filter products that match any of the keywords in subcategory, title, or description
            const matchedProducts = products.filter(item => {
                const sub = (item.subcategory || "").toLowerCase();
                const title = (item.title || item.name || "").toLowerCase();
                const desc = (item.description || "").toLowerCase();

                return keywords.some(keyword => 
                    sub.includes(keyword) || title.includes(keyword) || desc.includes(keyword) ||
                    keyword.includes(sub) || (sub.endsWith('s') && sub.slice(0, -1) === keyword)
                );
            });

            // Agar keyword matching ke baad products milte hain, toh wahi dikhao, warna category ke saare dikha do
            if (matchedProducts.length > 0) {
                products = matchedProducts;
            }
        }

        return NextResponse.json(
            { success: true, products }, 
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json(
            { success: false, error: error.message }, 
            { status: 500 }
        );
    }
}



// 2. POST Request: Admin panel se naya product save karne ke liye
export async function POST(request) {
    try {
        const client = await clientPromise;
        const db = client.db("youth-pinnacle");
        
        const body = await request.json();

       const newProduct = {
            title: body.title,
            name: body.title,
            category: body.category ? body.category.toLowerCase() : "",
            subcategory: body.subcategory ? body.subcategory.toLowerCase() : "",
            brand: body.brand || "YOUTH-PINNACLE",
            price: Number(body.price),
            originalPrice: body.originalPrice ? Number(body.originalPrice) : null,
            discount: body.discount || "",
            rating: body.rating || "4.5",
            reviewsCount: body.reviewsCount || "0",
            image: body.image || "",
            images: body.images ? body.images.filter(img => img.trim() !== "") : [],
            createdAt: new Date(),
        };

        // Yahan bhi collection ka naam "products" hi hai
        const result = await db.collection("products").insertOne(newProduct);

        return NextResponse.json({
            success: true, 
            product: { ...newProduct, _id: result.insertedId }
        }, { status: 201 });

    } catch (error) {
        console.log("Error creating product:", error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}

export async function PATCH(request){
    try{
        const client = await clientPromise;
        const db = client.db("youth-pinnacle");

        const {searchParams} = new URL(request.url);
        const body = await request.json();
        const id = searchParams.get("id") || body.id;

        if(!id || !ObjectId.isValid(id)){
            return NextResponse.json(
                {success: false, message: "valid product id is required"},
                {status: 400}
            );
        }

        const updateFields = {};
            if(body.title!== undefined){
                updateFields.title = body.title;
                updateFields.name = body.title
            }

            if(body.category !== undefined){
                updateFields.category = body.category? String(body.category).toLocaleLowerCase() : "";
            }
            if(body.subcategory!==undefined){
                updateFields.subcategory = body.subcategory? String(body.subcategory).toLocaleLowerCase(): "";
            }
            if(body.brand !== undefined)
                updateFields.brand = body.brand;
            if(body.price !==undefined) updateFields.price = Number(body.price)
            if(body.originalPrice!== undefined) {
                updateFields.originalPrice = body.originalPrice === "" || body.originalPrice === null
                ? null
                :Number(body.originalPrice);

            }

            if(body.discount!==undefined) updateFields.discount = body.discount;
            if(body.rating!== undefined) updateFields.rating = body.rating;
            if(body.reviewsCount!== undefined) updateFields.reviewsCount = body.reviewsCount;
            if(body.image !== undefined) updateFields.image = body.image;
            if (body.images !== undefined) {
            updateFields.images = Array.isArray(body.images)
                ? body.images.filter(img => String(img || "").trim() !== "")
                : [];
            }
            updateFields.updateAt = new Date();

            const result = await db
            .collection("products")
            .updateOne({_id: new ObjectId(id)}, {$set: updateFields});

            if(result.matchedCount === 0){
                return NextResponse.json(
                    {success: false, error: "Product not found"},
                    {status: 404}
                );
            }
            return NextResponse.json({
                success:true,
                messsage:"Product update successfully",
                updatedId: id,
            }, {status: 201});

         }  catch (error){
            console.error("Error updating product:", error);
            return NextResponse.json(
                {
                    success: false,
                    message: "server Error",
                    error: error.message,
                }, {status:500});
            }
         }

         export async function DELETE(request){
            try{
                const client = await clientPromise;
                const db = client.db("youth-pinnacle");
                
                const {searchParams} = new URL(request.url);
                let id = searchParams.get("id");

                if(!id ){
                    try{
                        const body = await request.json();
                        id = body?.id || body._body;
                    }catch{
                        // Empty body ko ignore karein
                    }
                    if(!id ||!ObjectId.isValid(id)){
                        return NextResponse.json(
                            {success:false, error:"Valid product id is required"},
                            {status:400}
                        );
                    }

                    const result = await db.collection("products")
                    .deleteOne({_id: new ObjectId(id) });

                    if(result.deleteCount === 0){
                        return NextResponse.json({
                            success: false, message: "product is not found"
                        }, {status: 404});
                    }

                    return NextResponse.json({
                        success: true,
                        message: "Product deleted successfully",
                        deletedId: id,
                    }, {status:200});
                   
                }
            
            }catch (error){
                console.error("Error deleting product:", error);
                return NextResponse.json(
                    {
                        success: false,
                        error: error.message,

                    },{status: 500}
                );
            }
         }