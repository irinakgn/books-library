const { get } = require('lodash');
const debug = require('debug')('app:userController');
const { MongoClient } = require('mongodb');

// TODO: convert this to env settings
const url = 'mongodb://localhost:27017';
const dbName = 'libraryApp';

const addUser = async (username, password) => {
  const client = await MongoClient.connect(url);
  debug('Connected correctly to server');

  const db = client.db(dbName);

  const users = db.collection('users');
  const userData = { username, password };
  const results = await users.insertOne(userData);
  debug(results);

  const user = get(results, 'ops.0', {});
  return user;
};

const authenticateUser = async (userName, password) => {
  const client = await MongoClient.connect(url);
  debug('Connected correctly to server');

  const db = client.db(dbName);

  const users = db.collection('users');
  const results = await users.findOne({
    username: userName,
  });


  debug('log in', results);
  if (results !== null) {
    if (results.password === password) {
      return {
        username:	results.username,
      };
    }
  } else {
    return null;
  }
};


module.exports = { addUser, authenticateUser };
