var express         = require('express'),
    http            = require('http'),
    url             = require('url'),
    util            = require('util'),
    path            = require('path'),
    favicon         = require('static-favicon'),
    logger          = require('morgan'),
    cookieParser    = require('cookie-parser'),
    bodyParser      = require('body-parser'),
    handlebars      = require('express-handlebars'),
    lessMiddleware  = require("less-middleware");

var app     = express();

// Handlebars view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', handlebars({extname:'.hbs', defaultLayout:'main'}));
app.set('view engine', 'hbs');

app.use(favicon());
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// LESS config
app.use(lessMiddleware(path.join(__dirname, 'assets', 'less'), {
    dest: path.join(__dirname, 'public'),
    preprocess: {
        path: function(pathname) {
            return pathname.replace('/css', '');
        }
    }
}));
app.use(express.static(path.join(__dirname, 'public')));

require("./router")(app);


/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Global template variables
app.locals =  {
    year: new Date().getFullYear()
};

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
