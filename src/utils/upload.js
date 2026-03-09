import multer from "multer";
import path from "path";
import fs from "fs";

// Helper to ensure upload folders exist
const ensureFolderExists = (folderPath) => {
  if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true });
};

// Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "profileImage") {
      const dir = path.join("uploads", "images");
      ensureFolderExists(dir);
      cb(null, dir);
    } else if (file.fieldname === "resumeFile") {
      const dir = path.join("uploads", "resumes");
      ensureFolderExists(dir);
      cb(null, dir);
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Export Multer instance
export const uploadFields = multer({ storage }).fields([
  { name: "profileImage", maxCount: 1 },
  { name: "resumeFile", maxCount: 1 },
]);