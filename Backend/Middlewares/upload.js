import multer from "multer";
import path from 'path';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, fn) => {
        fn(null, path.join(__dirname, '..', 'public', 'article_images'));
    },
    filename: (req, file, fn) => {
        // const extension = path.extname(file.originalname);
        // fn(null, Date.now() + extension);
        fn(null, req.body.img);
    }
});

const upload = multer({ storage: storage });

export default upload;
