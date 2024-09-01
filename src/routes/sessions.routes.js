import { Router } from 'express';
import passport from 'passport';
import userControllers from '../controllers/user.controllers.js';

const router = Router();

router.get('/current', passport.authenticate('jwt', { session: false }), userControllers.current);

export default router;
