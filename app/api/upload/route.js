import { NextResponse } from "next/server";
import {v2 as cloudinary} from "cloudinary";

    cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    function uploadBufferToCloudinary(buffer, folder = "youth-pinnacle/products"){
        return new Promise((resolve, reject )=>{
            const stream = cloudinary.uploader.upload_stream(
                {folder, resource_type: "image"},
                (error, result)=>{
                    if(error) return reject(error);
                    resolve(result);
                }
            );
            stream.end(buffer);
        });
    }

    export async function POST(request) {
        try{
            const formData = await request.formData();
            const files = formData.getAll("files");

              if (!files || !files.length){
                return NextResponse.json(
                    {success: false, error:"No image files received"},
                    {status: 400}
                );
            }

            const uploaded = [];

          

            for(const file of files){
                if(!file || typeof file.arrayBuffer !==  "function") continue;
                const buffer = Buffer.from(await file.arrayBuffer());
                const res = await uploadBufferToCloudinary(buffer);
                
                uploaded.push({
                    originalName: file.name,
                    url:res.secure_url,
                    publicId: res.public_id,
                });
            }

            return NextResponse.json(
                {
                    success: true,
                    files: uploaded,
                    urls: uploaded.map((item)=> item.url),
                },{status:201}
            );
        }catch (error){
            console.error("Cloudinary upload error:", error);
            return NextResponse.json(
                {success: false, error: error.message},
                {status: 500}
            );
        }
    }
