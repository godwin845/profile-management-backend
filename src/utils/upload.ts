import multer, { type StorageEngine } from "multer";
import path from "path";
import fs from "fs";
import type { Request } from "express";

/**
 * Ensure the upload folder exists
 */
const ensureFolderExists = (folderPath: string) => {
  if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true });
};

/**
 * Multer storage configuration
 */
const storage: StorageEngine = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    let dir: string;

    if (file.fieldname === "profileImage") {
      dir = path.join("uploads", "images");
    } else if (file.fieldname === "resumeFile") {
      dir = path.join("uploads", "resumes");
    } else {
      return cb(new Error("Invalid field name"), "");
    }

    ensureFolderExists(dir);
    cb(null, dir);
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, uniqueSuffix);
  },
});

/**
 * Multer instance for handling multiple fields
 */
export const uploadFields = multer({ storage }).fields([
  { name: "profileImage", maxCount: 1 },
  { name: "resumeFile", maxCount: 1 },
]);