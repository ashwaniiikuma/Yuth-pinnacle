import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { parse } from "csv-parse/sync";


  function resolvedImageUrl(rawValue, urlMap = {}){
    const cleaned = String(rawValue || "").trim();
    if(!cleaned) return "";

    if(cleaned.startsWith("http://") || cleaned.startsWith("https://")){
      return cleaned;
    }

    const fileName = cleaned.split("/").pop().trim().toLowerCase();
    return  urlMap[fileName] || "";
  }


function parseImages(rawImages, fallbackImage, urlMap = {}) {
  let list = [];

  if (Array.isArray(rawImages)) {
    list = rawImages.map((img) => String(img).trim()).filter(Boolean);
  } else if (typeof rawImages === "string" && rawImages.trim()) {
    const delimiter = rawImages.includes("|")
      ? "|"
      : rawImages.includes(";")
      ? ";"
      : ",";
    list = rawImages
      .split(delimiter)
      .map((img) => img.trim())
      .filter(Boolean);
  }
  const resolvedList = list.map((img) => resolvedImageUrl(img, urlMap))
  .filter(Boolean);

  if (resolvedList.length === 0 && fallbackImage){
  
    const resolvedFallback = resolvedImageUrl(fallbackImage, urlMap);
    if(resolvedFallback){
      return [resolvedFallback];
    }
  }

  return resolvedList;
}

function toNumberOrNull(val) {
  if (val === undefined || val === null) return null;
  const cleaned = String(val).replace(/,/g, "").trim();
  if (cleaned === "") return null;
  const num = Number(cleaned);
  return Number.isNaN(num) ? null : num;
}

export async function POST(request) {
  try { 
    const formData = await request.formData();
    const file = formData.get("file");
    const rawMap = formData.get("imageUrlMap");
   
        let urlMap = {};
    if (rawMap) {
      try {
        const parsed = JSON.parse(String(rawMap));
        urlMap = Object.fromEntries(
          Object.entries(parsed || {}).map(([k, v]) => [
            String(k).trim().toLowerCase(),
            v,
          ])
        );
      } catch {
        urlMap = {};
      }
    }
    console.log("Received imageUrlMap keys:", Object.keys(urlMap));

    if (!file) {
      return NextResponse.json({ success: false, message: "CSV file is required" }, { status: 400 });
    }

    // Convert file buffer to text string
    const buffer = Buffer.from(await file.arrayBuffer());
    const csvDataText = buffer.toString("utf-8");

    // Parse CSV records into JSON objects
    const records = parse(csvDataText, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    if (!records || records.length === 0) {
      return NextResponse.json({ success: false, message: "CSV file is empty or formatted incorrectly" }, { status: 400 });
    }

    // Map and sanitize records for MongoDB schema
     const formattedProducts = records.map((item) => {
      const rawMainImage = (item.image || "").trim();
      const images = parseImages(item.images, rawMainImage, urlMap);
      const image = resolvedImageUrl(rawMainImage , urlMap)|| images[0] || "";

      const name = (item.name || item.title || "").trim();
      const title = (item.title || item.name || "").trim();
      const category = (item.category || item.Category || "").trim().toLowerCase();
      const subcategory = (item.subcategory || item.subCategory || "").trim().toLowerCase();
      const brand = (item.brand || "").trim();
      const discount = (item.discount || "").trim();
      const rating = (item.rating || "").trim();
      const reviewsCount = (item.reviewsCount || "").trim();
      const description = (item.description || "").trim();

      return{
        title,
        name,
        category,
        subcategory,
        brand,
        price: toNumberOrNull(item.price),
        originalPrice: toNumberOrNull(item.originalPrice ?? item.discountPrice),
        discount,
        reviewsCount,
        rating,
        description,
        image,
        images,
        stock:toNumberOrNull(item.stock),
        createdAt: new Date(),
      };
    })
    .filter(Boolean)

    if(formattedProducts.length === 0){
      return NextResponse.json(
        {success: false, message: "No Valid product rows found in CSV"},
        {status: 400}
      )
    }

    const client = await clientPromise;
    const db = client.db("youth-pinnacle");

    // Enterprise Scaling: insertMany() processes all products in a single database transaction
    const result = await db.collection("products").insertMany(formattedProducts);
    const insertedCount = result.insertedCount ?? formattedProducts.length;

    return NextResponse.json({
      success: true,
      insertedCount,
      message: `${insertedCount} products imported successfully!`,
      products: formattedProducts,
    }, { status: 200 });

  } catch (error) {
    console.error("Error in bulk product import:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error during bulk import" }, { status: 500 });
  }
}