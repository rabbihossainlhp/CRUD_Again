const product = require("../models/product.model");


const createProduct = async (req, res) => {
    const { name, price, description, quantity } = req.body;
    const createProduct = await product.create({
        name,
        price,
        description,
        quantity
    });

    res.status(201).json({
        message: "Product created successfully",
        data: createProduct
    })
}







const getProducts = async (req, res) => {
    const limit = 10;
    const skipData = (req.query.page - 1) * limit;

    const products = await product.find({}).skip(skipData).limit(limit);
    
    console.log(req.query)

    res.status(200).json({
        message: "Got all products",
        data: products,
        paginaton:{
            "currentPage":req.query.page,
            "pageSize":limit
        }
    })
}







const updateProduct = async (req, res) => {
    const { name, price, description, quantity } = req.body;
    const getProduct = await product.findById(req.params.id);

    getProduct.name = name;
    getProduct.price = price;
    getProduct.description = description;
    getProduct.quantity = quantity;

    await getProduct.save();

    res.status(200).json({
        message: "Product updated successfully",
        data: getProduct
    })
}






const deleteProduct = async (req, res) => {
    await product.findByIdAndDelete(req.params.id);

    res.status(200).json({
        message: "Product deleted successfully",
    })
}






module.exports = {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct
}