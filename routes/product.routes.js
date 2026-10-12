const router = require("express").Router();
const { getProducts, createProduct, updateProduct, deleteProduct } = require("../controllers/product.controllers");




router.get("/products",getProducts);
router.post("/createproduct",createProduct);
router.put("/updateproduct/:id",updateProduct);
router.delete("/deleteproduct/:id",deleteProduct);



module.exports = router;