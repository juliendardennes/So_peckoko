//---Importer le package JsonWebToken---
const jwt = require("jsonwebtoken");

//---Contrôle des routes : vérifiez le TOKEN de l'utilisateur, s'il correspond---
//---à l'identifiant de l'utilisateur dans la requête, il sera autorisé à---
//---modifier les données correspondantes---
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
