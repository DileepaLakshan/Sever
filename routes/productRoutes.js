import express from 'express';
import { addProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../controllers/productController.js';
import { admin, protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').get(getProducts);
router.route('/:id').get(getProductById);
router.route('/addProduct').post(protect, admin, addProduct);
router.route('/:id').delete(protect, admin,deleteProduct);
router.route('/:id').put(protect, admin,updateProduct);

export default router;

