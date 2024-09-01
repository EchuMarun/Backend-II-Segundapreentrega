import { Router } from 'express';
import productsControllers from '../controllers/product.controllers.js';
import { authUser } from '../middlewares/authorizationUser.js';
const router = Router();

router.get('/', productsControllers.getAllProducts);

router.get('/:pid', productsControllers.getProductById);

router.post('/', authUser('admin'), productsControllers.createProduct);

router.put('/:pid', authUser('admin'), productsControllers.updateProduct);

router.delete('/:pid', authUser('admin'), productsControllers.deleteProduct);

export default router;
