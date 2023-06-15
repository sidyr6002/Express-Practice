const express = require("express");
const app = express();

//---------------- MIDDLEWARE ------------------------
const logger = require(`./logger.js`)

//---------------- HOST and PORT --------------------
const hostName = "127.0.0.1";
const port = "4040";

app.use(logger)

//----------------- METHODS ------------------------
app.get("/", (req, res) => {
    res.send("Home");
});

app.get("/About", (req, res) => {
    res.send(`About`);
});

app.get("/api/products", (req, res) => {
    res.send(`Products`);
});

app.get("api/items", (req, res) => {
    res.send(`Items`);
});

app.listen(port, hostName, () => {
    console.log(`Server is running on http://${hostName}:${port}/`);
});
