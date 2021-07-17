//---Import Express : utilisez le routeur express---
const express = require("express");

//---Appel du routeur express avec la méthode---
const router = express.Router();

//---Importer les contrôleurs de sauces. Les fonctions sont associées aux différentes routes---
const sauceCtrl = require("../controllers/sauce");

//---Importer l'authentification : obtenez la configuration d'authentification JsonWebToken---
const auth = require("../middleware/auth");

//---Import Multer: Manage images---
const multer = require("../middleware/multer-config");

//---Route pour créer une sauce : Capture et enregistre l'image,---
//---analyse la sauce à l'aide d'une chaîne et l'enregistre---
//---dans la base de données, en définissant correctement son URL image---
router.post("/", auth, multer, sauceCtrl.createOneSauce);

//---Route pour mettre à jour une sauce : Met à jour la sauce avec l'ID fourni---
router.put("/:id", auth, multer, sauceCtrl.modifyOneSauce);

//---Route pour supprimer une sauce : Supprimer la sauce avec l'identifiant fourni---
router.delete("/:id", auth, sauceCtrl.deleteOneSauce);

//---Route pour obtenir une sauce : renvoie la sauce avec l'identifiant fourni---
router.get("/:id", auth, sauceCtrl.getOneSauce);

//---Route pour obtenir toutes les sauces : renvoie---
//---le tableau de toutes les sauces dans la base de données---
router.get("/", auth, sauceCtrl.getAllSauce);

module.exports = router;
