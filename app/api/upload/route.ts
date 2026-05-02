import { NextResponse } from "next/server";
import cloudinary from "../../lib/cloudinary";

interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "Cần có file" }, { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Chỉ cho phép file ảnh" },
        { status: 400 },
      );
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File quá lớn (tối đa 5MB)" },
        { status: 400 },
      );
    }

    // Convert to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload using stream (BEST PRACTICE)
    const result = await new Promise<CloudinaryUploadResult>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "circle-posts",
            resource_type: "image",
          },
          (error: unknown, result: unknown) => {
            if (error) reject(error);
            else resolve(result as CloudinaryUploadResult);
          },
        );

        uploadStream.end(buffer);
      },
    );

    return NextResponse.json(
      {
        publicId: result.public_id,
        url: result.secure_url,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    return NextResponse.json({ error: "Tải lên thất bại" }, { status: 500 });
  }
}
