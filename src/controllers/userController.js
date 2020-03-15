const { get } = require('lodash');
const debug = require('debug')('app:userController');
const { MongoClient } = require('mongodb');

const config = require('config');

const dbConfig = config.get('dbConfig');


const addUser = async (userName, password) => {
  const client = await MongoClient.connect(dbConfig.host);
  debug('Connected correctly to server');

  const db = client.db(dbConfig.collectionName);


  const users = db.collection('users');
  const existingUser = await users.findOne({
    username: userName,
  });

  if (existingUser) {
    return null;
  }

  const userData = {
    username: userName,
    password,
  };

  const results = await users.insertOne(userData);
  debug(results);

  const user = get(results, 'ops.0', {});
  return user;
};

const authenticateUser = async (userName, password) => {
  const client = await MongoClient.connect(dbConfig.host);
  debug('Connected correctly to server');

  const db = client.db(dbConfig.collectionName);

  const users = db.collection('users');
  const results = await users.findOne({
    username: userName,
  });


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
