import multer from 'multer';
import path from 'path';

// Multer config for memory storage
const storage = multer.memoryStorage();

// Check file type
const checkFileType = (file, cb) => {
  const filetypes = /jpeg|jpg|png|gif|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Images only! (jpeg, jpg, png, gif, webp)'));
  }
};

// Multer upload
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
});

export default upload;