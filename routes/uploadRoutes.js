import path from 'path';
import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Memory Storage for buffer upload
const storage = multer.memoryStorage();

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|webp|gif|svg/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Images only! (jpg, jpeg, png, webp, gif, svg)'));
  }
}

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
});

// Configure Cloudinary from env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'wovvjawt',
  api_key: process.env.CLOUDINARY_API_KEY || '878276478496351',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'mrqwLPoUCQCRMYPABLCNYvb-Syk'
});

router.post('/', protect, upload.single('image'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'Please upload an image file' });
    }

    // Stream upload to Cloudinary
    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'biospark',
            resource_type: 'image'
          },
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
        stream.end(fileBuffer);
      });
    };

    const result = await streamUpload(req.file.buffer);

    res.status(200).json({
      success: true,
      data: {
        url: result.secure_url,
        public_id: result.public_id,
        filename: result.original_filename || req.file.originalname
      },
      message: 'Image uploaded successfully to Cloudinary'
    });
  } catch (err) {
    console.error('Cloudinary Upload Error:', err);
    res.status(500).json({
      success: false,
      error: err.message || 'Cloudinary upload failed'
    });
  }
});

export default router;
