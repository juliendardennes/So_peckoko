//---Import Express (Node JS Framework)---
const express = require("express");

//---Créer express application---
const app = express();

//---Import Body Parser : pour extraire l'objet Json de la requête POST---
const bodyParser = require("body-parser");

//---Importer le package Mongoose : pour gérer et utiliser la base de données Mongo---
const mongoose = require("mongoose");

//---importer routes sauce---
const saucesRoutes = require("./routes/sauces");

//---importer routes utilisateur---
const userRoutes = require("./routes/user");

//---Importer path : pour travailler avec les chemins de fichiers et de répertoires---
const path = require("path");

mongoose
  .connect(
    "mongodb+srv://julienDardennes:Criminals13@cluster0.6erfe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

//---Gestion du partage des ressources d'origine croisée---
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//---Transformer les données de la méthode POST en JSon---
app.use(bodyParser.json());

//---route pour les sauces---
app.use("/api/sauces", saucesRoutes);

//---route pour l'utilisateur---
app.use("/api/auth", userRoutes);

//---Pour charger des fichiers qui se trouvent dans le répertoire images--
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
