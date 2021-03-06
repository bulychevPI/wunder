var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose= require('mongoose');
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


var routes = require('./routes/index');

mongoose.connect('mongodb://127.0.0.1/wunder');
var app = express();
require('./config/confPassport')(passport);


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({secret: 'love'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());



// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');




var auth = function(req, res, next){
  if (!req.isAuthenticated()) res.redirect('/hello'); 
  else next();
};


// app.get('/',function(req,res){
//   res.sendfile(__dirname+'/public/index.html');
// });
app.use('/',require('./routes/index'));
app.use('/users',auth,require('./routes/users'));
app.use('/lists',auth, require('./routes/lists'));
app.use('/tasks',auth, require('./routes/tasks'));

// app.use('*',function(req,res,next){
//   res.redirect('/hello.html');
// });

app.use(express.static(path.join(__dirname, 'public')));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
   next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  if (err.status==404){res.render('404.html')}
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
