import Product from "../models/product.js";

// Create Product
export async function createProduct(req, res) {
    try {
        // Check login
        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        // Check admin
        if (!req.user.isAdmin) {
            return res.status(403).json({
                message: "Forbidden"
            });
        }

        // Check if product already exists
        const existingProduct = await Product.findOne({
            productId: req.body.productId
        });

        if (existingProduct) {
            return res.status(400).json({
                message: "Product already exists"
            });
        }

        // Create product
        const newProduct = new Product(req.body);

        await newProduct.save();

        res.status(201).json({
            message: "Product created successfully",
            product: newProduct
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Get All Products
export async function getAllProducts(req, res) {
    try {

        let products;

        if (req.user && req.user.isAdmin) {
            products = await Product.find();
        } else {
            products = await Product.find({
                isAvailable: true
            });
        }

        res.status(200).json(products);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Get Product By ID
export async function getProductById(req, res) {
    try {

        const foundProduct = await Product.findOne({
            productId: req.params.productId
        });

        if (!foundProduct) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        if (!foundProduct.isAvailable && (!req.user || !req.user.isAdmin)) {
            return res.status(403).json({
                message: "Product is not available"
            });
        }

        res.status(200).json(foundProduct);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Update Product
export async function updateProduct(req, res) {
    try {

        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        if (!req.user.isAdmin) {
            return res.status(403).json({
                message: "Forbidden"
            });
        }

        if (req.body.productId) {
            return res.status(400).json({
                message: "Product ID cannot be updated"
            });
        }

        const updatedProduct = await Product.findOneAndUpdate(
            {
                productId: req.params.productId
            },
            req.body,
            {
                new: true
            }
        );

        if (!updatedProduct) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product updated successfully",
            product: updatedProduct
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Delete Product
export async function deleteProduct(req, res) {
    try {

        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        if (!req.user.isAdmin) {
            return res.status(403).json({
                message: "Forbidden"
            });
        }

        const deletedProduct = await Product.findOneAndDelete({
            productId: req.params.productId
        });

        if (!deletedProduct) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}