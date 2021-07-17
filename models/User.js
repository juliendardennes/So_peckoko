//---Import Mongoose : définir des schémas avec des données fortement typées---
const mongoose = require("mongoose");

//---Importer le validateur unique Mongoose : ajoute une validation---
//---de pré-enregistrement pour les champs uniques dans un schéma Mongoose---
const uniqueValidator = require("mongoose-unique-validator");

//---Définir le schéma de l'utilisateur---
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

//---Appliquer le plugin uniqueValidator à userSchema---
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
