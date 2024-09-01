import express from 'express';
import expressSession from 'express-session';
import { connectionMongoDB } from './config/mongoDB.config.js';
import envsConfig from './config/envs.config.js';
import passport from 'passport';
import index from './routes/index.routes.js';
import cookieParser from 'cookie-parser';

import { initializedPassport } from './config/passport.config.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  expressSession({
    secret: envsConfig.CODE_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser());
connectionMongoDB();
initializedPassport();
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', index);

app.listen(envsConfig.PORT, () => {
  console.log(`conectado al puerto ${envsConfig.PORT}`);
});
