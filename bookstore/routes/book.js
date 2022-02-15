var express = require('express');
var router = express.Router();
var Book = require("../models/book");


router.get( '/', ( req, res )=>{
    //* fetch list of books from database it display all
    Book.find( {}, ( err, books ) => {
        //* if err pass it to error handler
        if ( err ) return next( err );
        //* render data on ejs with dynamic data
        res.render( "books", { books: books } );
    } );
} )

router.get( '/new', ( req, res )=>{
    res.render( "addBooks" );
} )

router.post( '/', ( req, res, next )=>{
    //* capture the data and save in database
    Book.create( req.body, ( err, data )=>{
        //* deal with err
        if ( err ) return next( err );
    } );
    //* send response
    res.redirect( '/books' );
} );

router.get( '/book/id', ( req, res, next ) => {
    var id = req.params.id;
    Book.findById( id, ( err, book ) => {
        if ( err ) return next( err );
        res.render( 'bookDetails', { book: book } )
    } );
} );


module.exports = router;