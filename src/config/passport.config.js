import passport from 'passport';
import local from 'passport-local';
import jwt from 'passport-jwt';
import envsConfig from './envs.config.js';
import cartServices from '../services/cart.services.js';
import { comparePassword, hashPassword } from '../utils/hashPassword.js';
import { cookieExtractor } from '../utils/cookieExtractor.js';
import userServices from '../services/user.services.js';

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

export const initializedPassport = () => {
  passport.use(
    'register',
    new LocalStrategy({ passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
      try {
        const { first_name, last_name, age } = req.body;
        const userExist = await userServices.findUser({ email: username });
        if (userExist) return done(null, false, { message: 'user already exist' });

        const cart = await cartServices.createCart();
        const newUser = {
          first_name,
          last_name,
          email: username,
          password: hashPassword(password),
          cart_id: cart._id,
          age,
        };
        const createdUser = await userServices.addUser(newUser);
        return done(null, createdUser);
      } catch (error) {
        done(error);
      }
    })
  );

  passport.use(
    'login',
    new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
      try {
        const userExist = await userServices.findUser({ email: username });
        if (!userExist || !comparePassword(userExist.password, password)) {
          return done(null, false, { message: 'user o password incorrect' });
        }
        return done(null, userExist);
      } catch (error) {
        done(error);
      }
    })
  );

  passport.use(
    'jwt',
    new JWTStrategy(
      { jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]), secretOrKey: envsConfig.JWT_CODE_SECRET },
      async (jwt_payload, done) => {
        try {
          const user = await userServices.findUser({ email: jwt_payload.email });
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userServices.findUser({ _id: id });
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};
