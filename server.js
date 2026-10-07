require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");


const app = express();
app.use(express.json());


mongoose.connect(process.env.DBURL).then(() => {
    console.log("MongoDB connected");
  }).catch((error) => {
    console.log("MongoDB connection error:", error.message);
  });



const productSchema = new mongoose.Schema({
    name:String,
    price:Number,
    description:String,
    quantity:Number,
});

const product = mongoose.model("Product",productSchema);





app.post("/api/v1/createproduct",async(req,res)=>{
  const {name,price,description,quantity} = req.body;
  const createProduct = await product.create({
    name,
    price,
    description,
    quantity
  });

  res.json({
    message:"Product created successfully",
    data:createProduct
  })
})





app.get("/api/v1/products",async(req,res)=>{
  const products = await product.find({});

  res.json({
    message:"Got all products",
    data:products
  })
})





app.put("/api/v1/updateproduct/:id",async(req,res)=>{
  const {name,price,description,quantity} = req.body;
  const getProduct = await product.findById(req.params.id);

  getProduct.name = name;
  getProduct.price = price;
  getProduct.description = description;
  getProduct.quantity = quantity;

  await getProduct.save();

  res.json({
    message:"Product updated successfully",
    data:getProduct
  })
})






app.delete("/api/v1/deleteproduct/:id",async(req,res)=>{
  await product.findByIdAndDelete(req.params.id);


  res.json({
    message:"Product deleted successfully",
  })
})






const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});