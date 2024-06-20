const express = require("express");
const app = express();
const config = require("config");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const corsOption = {
    origin: "*", //chap nhan tat ca domain
}
app.use(cors(corsOption));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use("/assets", express.static(`${__dirname}/../public`));
app.set("views", `${__dirname}/../resources/views`);
app.set("view engine", "ejs");
app.use(config.get("app.prefixApiVersion"), require(`${__dirname}/../routers/web`));

module.exports = app;
