const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");
const cors = require("cors");

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");

const mangaRouter = require('./routers/manga.router')

const app = express();

app.use(cors());
app.use(express.json());

console.log("App is starting..."); // Add a console log statement here

// Mount your router at the root URL ("/")
app.use("/", mangaRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
