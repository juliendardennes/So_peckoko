//---Import Express : utilisez le routeur express---
const express = require("express");

//---Appel du routeur express avec la méthode---
const router = express.Router();

//---Importer les contrôleurs des utilisateurs---
//---Les fonctions sont associées aux différentes routes---
const userCtrl = require("../controllers/user");

//---Route pour créer l'utilisateur---
//Crypte le mot de passe de l'utilisateur, ajoute l'utilisateur à la base de données
router.post("/signup", userCtrl.signup);

//---Route vers l'utilisateur de connexion---
//Vérifie les informations d'identification de l'utilisateur
//des informations d'identification, en renvoyant l'ID utilisateur
//de la base de données et un token JSON signé et signé
router.post("/login", userCtrl.login);

module.exports = router;
