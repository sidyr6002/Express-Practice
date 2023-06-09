const { products } = require("./data");
const express = require("express");
const app = express();

const hostName = "127.0.0.8";
const port = 4040;

app.get("/", (req, res) => {
    res.send(`
        <div style = "display: grid; justify-content: center; align-items:center; height:100vh;">
            <div style="text-align: center;">
                <h1>Home Page</h1>
                <a href="/api/products">Products</a>
            </div>
        </div>
    `);
});

app.get("/api/products", (req, res) => {
    const consProducts = products.map(({ item, name, image }) => ({item, name, image }));
    res.json(consProducts);
});

app.get("/api/products/:productId", (req, res) => {
    const { productId } = req.params;
    const singleProduct = products.find(
        (product) => product.id === Number(productId)
    );

    if(!singleProduct) {
        console.log(`Product with id: ${productId} is not found`)
    }
    res.json(singleProduct);
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
