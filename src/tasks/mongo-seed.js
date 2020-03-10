const { MongoClient } = require('mongodb');
const debug = require('debug')('task:mongo>seed');

const books = [
  {
    title: 'War and Peace',
    genre: 'Historical Fiction',
    author: 'Lev Nikolayevich Tolstoy',
    bookId: 656,
    read: false,
  },
  {
    title: 'Les Misérables',
    genre: 'Historical Fiction',
    author: 'Victor Hugo',
    bookId: 24280,
    read: false,
  },
  {
    title: 'The Time Machine',
    genre: 'Science Fiction',
    author: 'H. G. Wells',
    bookId: 2493,
    read: false,
  },
  {
    title: 'A Journey into the Center of the Earth',
    genre: 'Science Fiction',
    author: 'Jules Verne',
    bookId: 51431855,
    read: false,
  },
  {
    title: 'The Dark World',
    genre: 'Fantasy',
    author: 'Henry Kuttner',
    bookId: 1881716,
    read: false,
  },
  {
    title: 'Childhood',
    genre: 'Biography',
    author: 'Lev Nikolayevich Tolstoy',
    bookId: 226377,
    read: false,
  },
];


const init = async () => {
  const URL = 'mongodb://localhost:27017';
  const DB_NAME = 'libraryApp';

  let client;
  try {
    client = await MongoClient.connect(URL);
    debug('Connected correctly to server');

    const db = client.db(DB_NAME);
    const response = await db.collection('books').insertMany(books);
  } catch (err) {
    debug(err.stack);
  }
  client.close();
};

init();
