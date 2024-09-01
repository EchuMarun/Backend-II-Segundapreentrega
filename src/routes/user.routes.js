import { Router } from 'express';
import passport from 'passport';
import userControllers from '../controllers/user.controllers.js';

const router = Router();

router.post('/register', passport.authenticate('register'), userControllers.registerUser);

router.post('/login', passport.authenticate('login'), userControllers.loginUser);

export default router;
