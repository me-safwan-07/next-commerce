import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});


export async  function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File | null;

        if (!file) {
            return NextResponse.json(
                { success: false, message: "No file provided" },
                { status: 400 }
            );
        }

        // Convert file to buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Convert buffer to data URL
        const dataUrl = `data:${file.type};base64,${buffer.toString('base64')}`;

        // Upload to Cloudinary
        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload(
                dataUrl,
                {
                    folder: "e-commerce",
                    public_id: file.name.split('.')[0], // Remove file extension
                    overwrite: false,
                    unique_filename: true,
                    resource_type: 'auto', // Automatically detect image/video/raw
                },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );
        });

        type CloudinaryUploadResult = {
            secure_url: string;
        };

        const uploadResult = result as CloudinaryUploadResult;

        return NextResponse.json({
            success: true,
            url: uploadResult.secure_url,
        });
    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json(
            {
                succes: false,
                message: 'An error occurred during file upload.',
                error: error instanceof Error ? error.message : "Unknow error"
            },
            { status: 500 }
        );
    };
};