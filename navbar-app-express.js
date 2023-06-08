const path = require("path");
const express = require("express");
const app = express();

const hostName = "127.0.0.8";
const port = 4040;

app.use(express.static('./navbar-app/resources/javascript'));
app.use(express.static('./navbar-app/resources/css'));
app.use(express.static('./navbar-app/resources/images'));

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, `./navbar-app/index.html`));
});

app.all("*", (req, res) => {
    res.send(`
        <div style = "display: grid; justify-content: center; align-items:center; height:100vh;">
            <div style="text-align: center;">
                <h1>This is the wrong page</h1>
                <a href="/">Go Home</a>
            </div>
        </div>
    `);
});

app.listen(port, hostName, () => {
    console.log(`Server is running of http://${hostName}:${port}/`);
});
