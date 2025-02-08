import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const ALLOWED_FORMATS = ["jpg", "jpeg", "png", "heic"];

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const fileFormat = file.mimetype?.split("/")[1] || "";
    if (!ALLOWED_FORMATS.includes(fileFormat)) {
      throw new Error("Invalid file format");
    }
    return {
      folder: "article-images",
      format: fileFormat,
      public_id: Date.now() + "_" + file.originalname.replace(/\s+/g, "_"),
    };
  },
});

const upload = multer({ storage });

export { cloudinary, upload };
