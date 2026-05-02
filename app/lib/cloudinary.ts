import { v2 as cloudinary } from "cloudinary";

// Validate environment variables
if (!process.env.CLOUDINARY_CLOUD_NAME) {
  throw new Error("Thiếu biến môi trường CLOUDINARY_CLOUD_NAME");
}
if (!process.env.CLOUDINARY_API_KEY) {
  throw new Error("Thiếu biến môi trường CLOUDINARY_API_KEY");
}
if (!process.env.CLOUDINARY_API_SECRET) {
  throw new Error("Thiếu biến môi trường CLOUDINARY_API_SECRET");
}

cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
});

export default cloudinary;
