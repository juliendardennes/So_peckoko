//---Package d'importation Mongoose : solution basée---
//---sur un schéma pour modéliser les données de votre application---
const mongoose = require("mongoose");

//---Schéma des sauces---
const sauceSchema = mongoose.Schema({
  //Identifiant utilisateur du créateur du post de la sauce
  userId: { type: String, required: true },
  //nom de la sauce
  name: { type: String, required: true },
  //createur de la sauce
  manufacturer: { type: String, required: true },
  //Description de la sauce
  description: { type: String, required: true },
  //Ingredients de la sauce
  mainPepper: { type: String, required: true },
  //url de l'image de la sauce
  imageUrl: { type: String, required: true },
  //Puissance de la sauce
  heat: { type: Number, required: true },
  // -------------------------------------------
  //aime la sauce
  likes: { type: Number, default: 0 },
  //n'aime pas la sauce.
  dislikes: { type: Number, default: 0 },
  //L'utilisateur qui aime la sauce
  usersLiked: { type: [String], default: [] },
  //l'utilisateur qui n'aime pas la sauce
  usersDisliked: { type: [String], default: [] },
  // ------------------------------------------------
});

module.exports = mongoose.model("sauce", sauceSchema);
