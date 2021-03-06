const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 3000;


app.use(morgan('tiny'));

app.use((req, res, next) => {
  debug('my middleware');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'library' }));
app.use(passport.initialize());
app.use(passport.session());

require('./src/passport')(app);

app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const nav = [
  { link: '/books', title: 'Books' },
  { link: '/add-books', title: 'Add Book' },
];

const bookRouter = require('./src/routes/bookRoutes')(nav);
const authRouter = require('./src/routes/authRoutes')(nav);

app.use('/books', bookRouter);
app.use('/auth', authRouter);


app.get('/', (req, response) => {
  response.render(
    'signIn',
    {
      error: null,
      isAuthenticated: req.isAuthenticated(),
      nav,
      title: 'Library',
    },
  );
});


app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});
