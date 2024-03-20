import multer from "multer";
import path from "path";

// Configure storage with filename and destination
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

// Set up multer with configured storage
export const upload = multer({ storage: storage });

