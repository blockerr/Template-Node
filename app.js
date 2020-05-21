var createError = require('http-errors');
var express = require('express');
var path = require('path');
var directory = require('serve-index');
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
var lotRouter = require('./routes/lot');
var investorRouter = require('./routes/investor');
var home_advantageRouter = require('./routes/home_advantage');
var home_communityRouter = require('./routes/home_community');
var home_footerRouter = require('./routes/home_footer');
var home_introduceRouter = require('./routes/home_introduce');
var home_servicesRouter = require('./routes/home_services');
var home_slideRouter = require('./routes/home_slide');

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
app.use('/media', express.static(process.env.PATH_FILE), directory(process.env.PATH_FILE));


// declare use router
app.use(process.env.BASE_PATH, indexRouter);
app.use(process.env.BASE_PATH, adminRouter);
app.use(process.env.BASE_PATH, lotRouter);
app.use(process.env.BASE_PATH, investorRouter);
app.use(process.env.BASE_PATH, home_advantageRouter);
app.use(process.env.BASE_PATH, home_communityRouter);
app.use(process.env.BASE_PATH, home_footerRouter);
app.use(process.env.BASE_PATH, home_introduceRouter);
app.use(process.env.BASE_PATH, home_servicesRouter);
app.use(process.env.BASE_PATH, home_slideRouter);


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
 