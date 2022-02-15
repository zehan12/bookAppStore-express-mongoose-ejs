//! requires
const chalk = require('chalk');
var express = require('express');
var mongoose = require('mongoose');
var logger = require('morgan');
var path = require('path');
var indexRouter = require('./routes/index');
var bookRouter = require('./routes/book');

//! instantiating express app
var app = express();

//! mongo database created and connected to db
mongoose.connect( "mongodb://localhost/bookstore", 
    { useNewUrlParser : true, useUnifiedTopology: true },
    (err)=>{
    console.log( err ? chalk.red.inverse(err) :  `connected to database: ${chalk.green.inverse("true")}`);
} );


//? middlewares
app.use( ( req, res, next )=>{
    console.log( req.url )
    next();
} )

//! morgan middleware
app.use( logger('dev') );

//! set view engine ejs
app.set( "view engine", "ejs" );
app.set( "views", path.join( __dirname, "views" ) );

//! capture form data
app.use( express.urlencoded( { extended: false } ) );

//! setup static directory
app.use( express.static( path.join( __dirname, "public" ) ) );

//! routing middelwares
app.use( '/', indexRouter );
app.use( '/books', bookRouter );

//* error handler middlewares

//! error 404
app.use( ( req, res, next )=>{
    res.status(404).send("Page Not Found");
} );

//! custom error middleware
app.use( ( err, req, res, next )=>{
    res.send(err); 
} );

//! listener
app.listen( 3000, ()=>{
    console.log(chalk.rgb(15, 100, 204).inverse("server is listening on port 3k"));
} );
