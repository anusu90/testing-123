var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
 
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var blacklist = ["thisurl"];
app.use(cors({
  origin: function(origin, cb){
    if(blacklist.indexOf(origin) !== -1){
      cb(new Error('Not allowed by CORS'))
    } else {
      cb(null, true)
    }
  },
  exposedHeaders: ['myAgainJwt','Set-Cookie'],
  credentials:  true
}))

app.use(function(req,res,next){
  console.log("HI",req.headers);
  let allowedOrigin = ["http://127.0.0.1:5500/JS/Guvi-Day-37-Session/index.html", "https://keen-kalam-6de5f7.netlify.app/", "http://127.0.0.1:5500"]
  console.log(allowedOrigin.indexOf(req.headers.origin));
  if (allowedOrigin.indexOf(req.headers.origin) !== -1){
    res.header("Access-Control-Allow-Origin", req.headers.origin)
  }
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Set-Cookie");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});

// view engine setup




app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(cookieParser())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




// Set-Cookie: myAgainJwt=eyJhbGciOiJIUzI1NiJ9.aGVsbG8.IrGn7ohvqcBWADvGDdPprnKm__fDR7LjkmQwREt4crU; Path=/; SameSite=Lax

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
