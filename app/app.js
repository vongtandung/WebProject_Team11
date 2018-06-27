var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var express = require('express');
var exphbs = require('express-handlebars');
var exphbs_section = require('express-handlebars-sections');
var bodyParser = require('body-parser');
var MySQLStore=require('express-mysql-session')(session);

var handleLayoutMDW = require('./middle-wares/handleLayout');
var admincontroller = require('./controllers/admincontroller');
var accountcontroller = require('./controllers/accountcontroller');
var homecontroller = require('./controllers/homecontroller');
var cartcontroller = require('./controllers/cartcontroller');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


var sessionStore = new MySQLStore({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'thesheep',
  createDatabaseTable: true,
  schema: {
      tableName: 'sessions',
      columnNames: {
          session_id: 'session_id',
          expires: 'expires',
          data: 'data'
      }
  }
});

app.use(session({
  key: 'session_cookie_name',
  secret: 'session_cookie_secret',
  store: sessionStore,
  resave: false,
  saveUninitialized: false
}));


app.engine('hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: 'views/layout/',
  helpers: {
      section: exphbs_section(),
      number_format: n => {
          var nf = wnumb({
              thousand: ','
          });
          return nf.to(n);
      }
  }
}));
app.use(handleLayoutMDW);
app.use('/dashboard',admincontroller);
app.use('/account',accountcontroller);
app.use('/',homecontroller);
app.use('/cart',cartcontroller);

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
