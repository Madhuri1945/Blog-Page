import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const fileFilter = (req, file, cb) => {
  const isImage = /jpeg|jpg|png|webp/.test(file.mimetype);
  cb(isImage ? null : new Error("Only images allowed"), isImage);
};

export default multer({ storage, fileFilter });
