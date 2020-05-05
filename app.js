var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require('dotenv');
dotenv.config();

var indexRouter = require('./routes/index');

var app = express();
var cors = require('cors')
var http = require('http').createServer(app);

// import handler
const sequelize = require('./services/database');
var adminRouter = require('./routes/admin'); 

// check auth sequelize
sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to postgres');
    sequelize.sync();
  })
  .catch(err => {
    console.log(err); 
 
  })

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(process.env.BASE_PATH, indexRouter);
app.use(process.env.BASE_PATH, adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next();
  // next(createError(404));
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

// module.exports = app;


http.listen(3000, function () {
  console.log('listening on *:3000');
});
 