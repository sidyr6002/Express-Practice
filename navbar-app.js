const { readFileSync } = require("fs");
const http = require("http");

const hostname = "127.0.0.8";
const port = 4040;
// ------------------ Resources ------------------------
const homePage = readFileSync(`./navbar-app/index.html`);
const homeCss = readFileSync(`./navbar-app/styles.css`);
const homeLogic = readFileSync(`./navbar-app/browser-app.js`);
const homeLogo = readFileSync(`./navbar-app/logo.svg`)

const server = http.createServer((req, res) => {
    // --------------------- home page --------------------------
    if (req.url === "/") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.write(homePage);
        res.end();
    }
    // --------------------- CSS page -------------------------
    else if (req.url === "/styles.css") {
        res.writeHead(200, { "Content-Type": "text/css" });
        res.write(homeCss);
        res.end();
    }
    // --------------------- JS page -------------------------
    else if (req.url === "/browser-app.js") {
        res.writeHead(200, { "Content-Type": "text/javascript" });
        res.write(homeLogic);
        res.end();
    }
    // --------------------- Logo page -------------------------
    else if (req.url === "/logo.svg") {
        res.writeHead(200, { "Content-Type": "image/svg+xml" });
        res.write(homeLogo);
        res.end();
    }
    // ------------------ any random page -----------------------
    else {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.write(`
          <div style = "display: grid; justify-content: center; align-items:center; height:100vh;">
            <div style="text-align: center;">
                <h1>This is the wrong page</h1>
                <a href="/">Go Home</a>
            </div>
          </div>
        `);
        res.end();
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
