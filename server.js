//---Importer le package http---
const http = require("http");
const app = require("./app");

//---La fonction normalizePort renvoie un port valide, sous forme de nombre ou de chaîne---
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

//---si process.env.PORT n'est pas disponible, nous utilisons le port 3000---
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

//---La fonction errorHandler recherche les différentes erreurs et les gère de manière appropriée--
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      //permission refusée
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      //Port déjà utilisé
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

//---Créez un serveur avec express qui utilise l'application---
//---et créez une constante pour les appels de serveur (requêtes et réponses)--
const server = http.createServer(app);

//---Lancer le serveur et écouter s'il y a des erreurs---
server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

//---Le serveur écoute le port défini ci-dessus---
server.listen(port);
