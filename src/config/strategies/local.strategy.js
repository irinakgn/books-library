const passport = require('passport');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:local.strategy');
const { isNil } = require('lodash');

module.exports = function localStrategy() {
  passport.use(new Strategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    }, (username, password, done) => {
      // TODO: Fix indent
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';
      (async function mongo() {
        let client;

        try {
          client = await MongoClient.connect(url);

          debug('Connected correctly to server');

          const db = client.db(dbName);
          const users = db.collection('users');
          const user = await users.findOne({ username });

          if (!isNil(user) && user.password === password) {
            done(null, user);
          } else {
            done(null, false);
          }
        } catch (err) {
          debug(err.stack);
        }
        // Close connection
        client.close();
      }());
    },
  ));
};
