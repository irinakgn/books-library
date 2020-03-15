const debug = require('debug')('app:authRoutes');
const express = require('express');
const passport = require('passport');
const userController = require('../controllers/userController');


const authRouter = express.Router();

const router = (nav) => {
  authRouter.route('/signin').post(async (req, res) => {
    const { username, password } = req.body;

    const user = await userController.authenticateUser(username, password);

    if (user !== null) {
      req.login(user, () => {
        res.redirect('/books');
      });
    } else {
      res.render(
        'signIn',
        {
          error: 'Cannot Sign User In!',
          isAuthenticated: false,
          nav: [{ link: '/books', title: 'Books' }],
          title: 'Library',
        },
      );
    }
  });

  authRouter.route('/signup')
    .post(async (req, res) => {
      try {
        const { username, password } = req.body;

        const user = await userController.addUser(username, password);

        if (user !== null) {
          req.login(user, () => {
            res.redirect('/auth/profile');
          });
        } else {
          res.render('signUp', {
            error: 'User Exists Already!',
            isAuthenticated: req.isAuthenticated(),
            nav,
            title: 'Sign Up',
          });
        }
      } catch (e) {
        debug(e);
      }
    });

  authRouter.route('/signup')
    .get((req, res) => {
      res.render('signUp', {
        error: null,
        isAuthenticated: req.isAuthenticated(),
        nav,
        title: 'Sign Up',
      });
    })
    .post(passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/',
    }));
  authRouter.route('/profile')
    .all((req, res) => {
      if (req.user) {
        res.redirect('/books');
      } else {
        res.redirect('/');
      }
    })
    .get((req, res) => {
      res.json(req.user);
    });


  authRouter.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  return authRouter;
};


module.exports = router;
