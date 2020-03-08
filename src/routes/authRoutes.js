const debug = require('debug')('app:authRoutes');
const express = require('express');
const passport = require('passport');
const userController = require('../controllers/userController');


const authRouter = express.Router();

function router(nav) {
  authRouter.route('/signup')
    .post((req, res) => {
      try {
        const { username, password } = req.body;

        const user = userController.addUser(username, password);

        req.login(user, () => {
          res.redirect('/auth/profile');
        });
      } catch (e) {
        debug(e);
      }
    });

  authRouter.route('/signup')
    .get((req, res) => {
      res.render('signUp', {
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
}


module.exports = router;
