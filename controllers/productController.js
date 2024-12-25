import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';
import User from "../Models/userModel.js";


// @desc    add a new product
// @route   POST /api/addProduct
// @access  Public
const addProduct = asyncHandler(async (req, res) => {
    const { name, image, category, description, price  } = req.body;

  
    const user = await User.findById(req.user._id);

  
   console.log(name);

    const product = await Product.create({
      user,
      name,
      image,
      category,
      description,
      price
    });
  
    if(product) {
      res.status(201).json({
        _id: product._id,
        name: product.name,
        image: product.image,
        category: product.category,
        description: product.description,
        price: product.price,
      });
    }else {
      res.status(400);
      throw new Error('Invalid product data');
    }
  });



// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {

  const products = await Product.find({});
  res.json(products);

});



// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {

  const product = await Product.findById(req.params.id);

  if (product) {
    return res.json(product);
  }

  res.status(404);
  throw new Error('Resource not found');

});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Public
const updateProduct = asyncHandler(async (req, res) => {
  const { name, image, category, description, price } = req.body;

  // Find the product by ID
  const product = await Product.findById(req.params.id);

  if (product) {
    // Update the product's fields
    product.name = name || product.name;
    product.image = image || product.image;
    product.category = category || product.category;
    product.description = description || product.description;
    product.price = price || product.price;

    // Save the updated product
    const updatedProduct = await product.save();

    // Send the updated product in the response
    res.status(200).json({
      _id: updatedProduct._id,
      name: updatedProduct.name,
      image: updatedProduct.image,
      category: updatedProduct.category,
      description: updatedProduct.description,
      price: updatedProduct.price,
    });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});



// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Public
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
      await product.deleteOne();
      res.json({ message: 'Product removed' });
  } else {
      res.status(404);
      throw new Error('Product not found');
  }
});

export { addProduct, deleteProduct, getProductById, getProducts, updateProduct };

