import express from "express";

const router = express.Router();

// Products data (in a real application, this would come from a database)
const PRODUCTS = [
    { id: 1, name: "T-shirt", price: 499 },
    { id: 2, name: "Shoes", price: 1299 },
    { id: 3, name: "Watch", price: 2599 },
];

// Products List Route
router.get("/products", (req, res) => {
    res.json({
        message: "Welcome to the E-Commerce API",
        products: [
            { id: 1, name: "T-shirt", price: 499 },
            { id: 2, name: "Shoes", price: 1299 },
            { id: 3, name: "Watch", price: 2599 },
        ],
    });
});

// Product Purchase Route
router.post("/purchase", (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ error: "Product ID is required" });
    }

    const product = PRODUCTS.find(p => p.id === Number(id));

    if (!product) {
        return res.status(404).json({ error: "Product not found" });
    }

    // Simulating a purchase operation
    res.json({
        message: `Purchase successful for: ${product.name}`,
        product,
    });
});


export default router;
