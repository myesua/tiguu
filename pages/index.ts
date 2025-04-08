import figlet from "figlet";
import express from "express";
import { Register, Login } from "./auth";
import path from "path";
import bodyParser from "body-parser";
// import fs from "fs";
// import https from "https";
import { connect, disconnect } from "mongoose";

const app = express();
const port = process.env.PORT || 3004;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
(async () => {
  try {
    await connect(`${process.env.DB}`, {
      dbName: "tiguuweb",
    });
    console.log("Db connected!");
  } catch (err) {
    console.error(err);
  }
  // connect to database

  // routes
  app.get("/register", (req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.status(200).sendFile(path.join(__dirname, "/register.html"));
  });
  app.get("/login", (req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.status(200).sendFile(path.join(__dirname, "/login.html"));
  });
  app.post("/register", Register);
  app.post("/login", Login);

  // app.use("/", router);

  // const options = {
  // 	key: fs.readFileSync(
  // 		path.join(__dirname, "../localhost.decrypted.key"),
  // 		"utf-8"
  // 	),
  // 	cert: fs.readFileSync(path.join(__dirname, "../localhost.crt"), "utf-8"),
  // };

  // const sslServer = https.createServer(options, app);
  // sslServer.listen(port, () => {
  // 	console.log("Secure server is listening on port " + port);
  // });

  app.listen(port, () => {
    console.log(`Server now running on http://localhost:${port}`);
    console.log(Bun.version);
  });

  process.on("SIGINT", async () => {
    await disconnect();
    process.exit(0);
  });
})();
