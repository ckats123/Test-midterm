// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));
app.use(cookieParser());

// For viewing permissions
app.use((req, res, next) => {
  const user = req.cookies.email; // Get email from cookie
  res.locals.user = user; // Make the user object available to all templates
  next();
});

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');

const listingApiRoutes = require('./routes/listings-api');
const loginRoutes = require('./routes/login');
const logoutRoutes = require('./routes/logout');
const listingsRoutes = require('./routes/listings');
const favoritesRoutes = require('./routes/favorites');
const accountRoutes = require('./routes/account');
const createListingRoutes = require('./routes/create-listing');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);

app.use('/api/listings', listingApiRoutes);
app.use('/login', loginRoutes);
app.use('/logout', logoutRoutes);
app.use('/listings', listingsRoutes);
app.use('/favorites', favoritesRoutes);
app.use('/account', accountRoutes);
app.use('/create-listing', createListingRoutes);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
