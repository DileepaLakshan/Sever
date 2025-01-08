import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';
import User from "../Models/userModel.js";


// @desc    add a new product
// @route   POST /api/addProduct
// @access  Public
const addProduct = asyncHandler(async (req, res) => {
<<<<<<< Updated upstream
    const { name, image, category, description, price  } = req.body;
=======
  // console.log(req.body);
  const { name, image, category, description, price, modelImageUrl } = req.body;
>>>>>>> Stashed changes

  
    const user = await User.findById(req.user._id);

  
 //   console.log(user);

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

<<<<<<< Updated upstream
=======
  // console.log(product);

  if (product) {
    // Send success response with additional 'success' field
    res.status(201).json({
      success: true, // Include the 'success' field for frontend validation
      message: "Product added successfully", // Success message
      _id: product._id,
      name: product.name,
      image: product.image,
      category: product.category,
      description: product.description,
      price: product.price,
      modelImageUrl: product.modelImageUrl
    });
  } else {
    res.status(400).json({
      success: false, // Send success as false in case of failure
      message: 'Invalid product data', // Failure message
    });
  }
});


>>>>>>> Stashed changes


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


export { addProduct, getProducts, getProductById };