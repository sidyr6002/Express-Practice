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
    return res.json(consProducts);
});

app.get("/api/products/:productId", (req, res) => {
    const { productId } = req.params;
    const singleProduct = products.find(
        (product) => product.id === Number(productId)
    );

    if (!singleProduct) {
        return res.status(404).send(`<h1 style="text-align:center; line-height:100vh">Product Doesn't exist</h1>`);
    }

    return res.json(singleProduct);
});

app.get("/api/v1/query", (req, res) => {
    const { search, limit } = req.query;
    let filteredProducts = [...products];

    if (search) {
        filteredProducts = filteredProducts.filter((product) => {
            return product.name.startsWith(search);
        });
    }

    if (limit) {
        filteredProducts = filteredProducts.slice(0, Number(limit));
    }

    return res.status(200).json({success: true, data: filteredProducts});
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
