import ProductModel from "../models/ProductModel.js";

export const createproduct = async (req, res, next) => {
    console.log("product");
    try {
        const { name, price, image } = req.body;
    
        // Create a new product instance
        const product = new ProductModel({
          name,
          price,
          image,
        });
    
        // Save the product to the database
        const newProduct = await product.save();
    
        res.status(201).json(newProduct);
      } catch (error) {
        console.log(error);
        res.status(404).json({ error: error.message });
      }
};


export const getAllproduct = async (req, res, next) => {
    let product;
    try {
      console.log("here1")
      product = await ProductModel.find();
    } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  
    if (!product || product.length === 0) {
      return res.status(404).json({ message: "product not found" });
    }
  
    return res.status(200).json({ product });
  };