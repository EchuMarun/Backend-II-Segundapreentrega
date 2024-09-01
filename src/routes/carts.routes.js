import { checkProdAndCart } from '../middlewares/checkProdAndCart.middleware.js';
import cartControllers from '../controllers/cart.controllers.js';
import { authUser } from '../middlewares/authorizationUser.js';
import passport from 'passport';

import { Router } from 'express';

const router = Router();

router.post('/', cartControllers.createCart);

router.get('/:cid', cartControllers.getProductsByIdCart);

router.post('/:cid/products/:pid', authUser('user'), checkProdAndCart, cartControllers.pushProductInCart);

router.delete('/:cid/products/:pid', checkProdAndCart, cartControllers.deleteProductById);

router.put('/:cid/products/:pid', checkProdAndCart, cartControllers.updateProductsByQuantity);

router.delete('/:cid', cartControllers.deleteAllProducts);

router.get(
  '/:cid/purchase',
  passport.authenticate('jwt', { session: false }),
  authUser('user'),
  cartControllers.purchase
);

export default router;
