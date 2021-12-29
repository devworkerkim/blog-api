const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
require('dotenv').config();

const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');
const blogpostsRouter = require('./routes/blogposts');
const publicpostsRouter = require('./routes/publicposts');

require('./controller/passport');

const User = require('./models/user');

const app = express();

//Set up mongoose connection
const mongoose = require('mongoose');
const mongoDB = process.env.MONGODB_SERVER;
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.use(passport.initialize());
// app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/blogposts', blogpostsRouter);
app.use('/publicposts', publicpostsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
