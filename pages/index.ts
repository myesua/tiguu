import figlet from "figlet";
import express from "express";
import { Register, Login } from "./auth";
import path from "path";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
// import fs from "fs";
// import https from "https";
import { connect, disconnect } from "mongoose";
dotenv.config();

const app = express();
const port = process.env.PORT || 3004;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// connect to database
(async () => {
  try {
    await connect(`${process.env.DB}`, {
      dbName: "tiguuweb",
    });
    console.log("Db connected!");
  } catch (err) {
    console.error(err);
  }

  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "views"));
  // routes
  app.get("/register", (req, res) => {
    res.setHeader("Content-Type", "text/html");
    // res.status(200).sendFile(path.join(__dirname, "/register.html"));
    res.render("register", { baseUrl: process.env.BASE_URL || "" });
  });
  app.get("/login", (req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.render("login", { baseUrl: process.env.BASE_URL || "" });
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
