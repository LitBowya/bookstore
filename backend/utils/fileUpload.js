import path from "path";
import fs from "fs";
import multer from "multer";
import logger from "../utils/logger.js";
import { config } from "dotenv";

config();

const uploadsDir = path.join("uploads/");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
    destination(req, file, cb) {
        logger.debug("Setting destination for uploaded file");
        cb(null, uploadsDir);
    },
    filename(req, file, cb) {
        const filename = `${file.fieldname}-${Date.now()}${path.extname(
            file.originalname
        )}`;
        logger.debug(`Generated filename: ${filename}`);
        cb(null, filename);
    },
});

// File filter function
function fileFilter(req, file, cb) {
    logger.debug(`Filtering file: ${file.originalname}`);
    const imageFiletypes = /jpe?g|png|webp/;
    const pdfFiletypes = /pdf/;
    const imageMimetypes = /image\/jpe?g|image\/png|image\/webp/;
    const pdfMimetype = /application\/pdf/;

    if (file.fieldname === 'coverImage') {
        const extname = imageFiletypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = imageMimetypes.test(file.mimetype);
        if (extname && mimetype) {
            logger.debug("Cover image file type is valid");
            cb(null, true);
        } else {
            logger.error("Invalid cover image file type");
            cb(new Error("Cover images only!"), false);
        }
    } else if (file.fieldname === 'bookPdf') {
        const extname = pdfFiletypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = pdfMimetype.test(file.mimetype);
        if (extname && mimetype) {
            logger.debug("PDF file type is valid");
            cb(null, true);
        } else {
            logger.error("Invalid PDF file type");
            cb(new Error("PDFs only!"), false);
        }
    } else {
        logger.error("Invalid file field");
        cb(new Error("Invalid file field"), false);
    }
}

// Middleware for handling multiple files
export const uploadBookFiles = multer({ storage, fileFilter }).fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'bookPdf', maxCount: 1 }
]);
