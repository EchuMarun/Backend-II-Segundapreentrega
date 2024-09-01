import { Router } from 'express';
import carts from './carts.routes.js';
import products from './products.routes.js';
import users from './user.routes.js';
import sessions from './sessions.routes.js';

const router = Router();

router.use('/carts', carts);
router.use('/products', products);
router.use('/user', users);
router.use('/sessions', sessions);

export default router;
