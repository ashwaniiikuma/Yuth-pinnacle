import { NextResponse } from "next/server";
import {writeFile} from "fs/promises";
import path from "path";
export async function POST(request){
    try{
        const data = await request.formData();
        const files = data.getAll("images");

        if(!files || files.length === 0){
            return NextResponse.json({success: false, message: "No images uploaded"}, {status:400});
        }

        const uploadedUrls = [];

        for(const file of files){
            const bytes = await  file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const filename = `${Date.now()}-${file.name.replace(/\s/g, "_")}`;
            const uploadDir = path.join(process.cwd(), "public/upload", filename)
        
            await writeFile(uploadDir, buffer);

            const fileUrl = `/upload/${filename}`;
            uploadedUrls.push(fileUrl);
        }
        return NextResponse.json({
            success: true,
            urls: uploadedUrls,
            message: "Images uploasded successfully"
        })
    }catch (error){
        console.log("Error uploading images:", error);
        return NextResponse.json({success: false, message: "Ineternal server Error"}, {status: 500});
    }
}