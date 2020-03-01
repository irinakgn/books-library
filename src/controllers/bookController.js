const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookController');

function bookController(bookService, nav) {
    function getIndex(req, res) {

        const url = 'mongodb://localhost:27017';
        const dbName = 'libraryApp';

        (async function mongo() {
            let client;
            try {
                client = await MongoClient.connect(url);

                const db = client.db(dbName);

                const col = await db.collection('books');

                const booksModel = await col.find().toArray();

                const bookQueue = []
                for (const bookModel of booksModel) {
                    if (bookModel.bookId) {
                        bookQueue.push({ ...bookModel, details: await bookService.getBookById(bookModel.bookId) })
                    }
                }

                const booksWithDetials = await Promise.all(bookQueue);

                res.render(
                    'bookListView',
                    {
                        nav,
                        title: 'Books',
                        books: booksWithDetials
                    }
                );
            } catch (err) {
                debug(err.stack);
            }
            client.close();
        }());


    }
    function getById(req, res) {
        const { id } = req.params;
        const url = 'mongodb://localhost:27017';
        const dbName = 'libraryApp';

        (async function mongo() {
            let client;
            try {
                client = await MongoClient.connect(url);
                debug('Connected correctly to server');

                const db = client.db(dbName);

                const col = await db.collection('books');

                const book = await col.findOne({ _id: new ObjectID(id) });



                book.details = await bookService.getBookById(book.bookId);
                res.render(
                    'bookView',
                    {
                        nav,
                        title: 'Book',
                        book
                    }
                );
            } catch (err) {
                debug(err.stack);
            }
        }());
    }

    function middleware(req, res, next) {
        //if (req.user) {
        next();
        //} else {
        //  res.redirect('/');
        //}
    }

    return {
        getIndex,
        getById,
        middleware
    };
}

module.exports = bookController;