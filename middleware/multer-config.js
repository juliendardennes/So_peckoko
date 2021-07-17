//---Importer le package MULTER, pour gérer les images---
const multer = require("multer");

//---Liste des formats d'images acceptés---
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

//---Emplacement de stockage et nom de fichier---
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

module.exports = multer({ storage: storage }).single("image");
