//---Import Sauce schema---
const Sauce = require("../models/Sauce");

//---Système de fichiers du package d'importation : pour gérer le téléchargement et l'upload---
const fs = require("fs");

//---Création d'une sauce---
exports.createOneSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  sauce
    .save()
    .then(() =>
      res.status(201).json({ message: "The sauce has been registered !" })
    )
    .catch((error) => res.status(400).json({ error }));
};

//---Modification d'une sauce---
exports.modifyOneSauce = (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Sauce.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  )
    .then(() =>
      res.status(200).json({ message: "The sauce has been modified !" })
    )
    .catch((error) => res.status(400).json({ error }));
};

//---Supprimer une sauce---
exports.deleteOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() =>
            res.status(200).json({ message: "The sauce has been deleted !" })
          )
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};
//---Récupération d'une seule sauce par ID---
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id,
  })
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

//---Récupérer la liste des sauces---
exports.getAllSauce = (req, res, next) => {
  Sauce.find()
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

//----------------------------------------------------------------
// Aime ou n'aime pas une sauce
exports.likeDislikeSauce = (req, res, next) => {
  const isUserLike = new Sauce({
    likes: req.body.like,
    userId: req.body.userId,
  });
  Sauce.findOne({
    _id: req.params.id,
  })
    .then((sauce) => {
      Sauce.updateOne({ _id: req.params.id }, sauce);
      //Si l'utilisateur veut aimer.
      if (
        isUserLike.likes === 1 &&
        !sauce.usersLiked.includes(isUserLike.userId)
      ) {
        sauce.likes = sauce.likes + 1;
        sauce.usersLiked.push(isUserLike.userId);
      }
      //Si l'utilisateur veut supprimer j'aime ou n'aime pas.
      else if (isUserLike.likes === 0) {
        //Si l'utilisateur aime déjà la sauce et souhaite supprimer comme.
        if (sauce.usersLiked.includes(isUserLike.userId)) {
          let userLikedSauce = sauce.usersLiked.indexOf(isUserLike.userId);
          sauce.likes = sauce.likes - 1;
          sauce.usersLiked.splice(userLikedSauce, 1);
        }
        //Si l'utilisateur n'aime déjà pas la sauce et souhaite supprimer.
        if (sauce.usersDisliked.includes(isUserLike.userId)) {
          let userDislikedSauce = sauce.usersDisliked.indexOf(
            isUserLike.userId
          );
          sauce.dislikes = sauce.dislikes - 1;
          sauce.usersDisliked.splice(userDislikedSauce, 1);
        }
      }
      //Si l'utilisateur ne veut pas aimer.
      else if (
        isUserLike.likes === -1 &&
        !sauce.usersDisliked.includes(isUserLike.userId)
      ) {
        sauce.dislikes = sauce.dislikes + 1;
        sauce.usersDisliked.push(isUserLike.userId);
      }
      sauce.save(sauce);
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};
// ---------------------------------------------------------------
